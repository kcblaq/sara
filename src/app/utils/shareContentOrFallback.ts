export function shareContent(url: string, title: string, text: string) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url: url,
      })
      .then(() => {
        console.log("Successfully shared!");
      })
      .catch((error) => {
        console.error("Something went wrong sharing the content", error);
      });
  } else {
    console.log("Web Share API is not supported on this browser.");
  }
}

export function fallbackShare(url: string) {
  const shareUrl = url;
  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

interface shareOrFallbackType {
  url: string;
  title: string;
  text: string;
}

export function shareOrFallback({ url, title, text }: shareOrFallbackType) {
  if (typeof navigator.share === "function") {
    shareContent(url, title, text);
  } else {
    fallbackShare(url);
  }
}
