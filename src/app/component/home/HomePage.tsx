import Link from "next/link";
import FilledButton from "../FilledButton";
import Nav from "./nav/Nav";
import Image from "next/image";
import { FeatureCard, WhyUseWemaxiCard } from "../landingpage/Homecomponents";
import PlainButton from "../PlainButton";
import FAQComponent from "./faq/FAQComponent";
import { currentYear } from "@/app/utils/currenYear";
import Footer from "./footer/Footer";
import TempFooter from "./footer/TempFooter";

export default function HomePage() {
     return (
          <main className="w-full snap-y snap-mandatory overflow-y-scroll h-full text-base font-normal">
               <div className="top-0 z-50 left-0 fixed w-full">
                    <Nav />
                    <hr className="w-full" />
               </div>
               <section className="h-full snap-start py-28 flex flex-col w-full items-center justify-start bg-secondary"

               >
                    <div className="flex gap-[48px] lg:max-w-[1100px] flex-col w-full h-full mt-4 lg:mt-[70px] 2lg:mt-[96px] justify-center items-center ">
                         <div className=" flex space-y-1 flex-col items-center px-4 gap-6 h-full ">
                              <h1 className=" lg:text-6xl text-center text-[#101828] leading-loose text-3xl font-semibold ">
                                   Unlock your website's full potential with intelligent SEO solutions
                              </h1>
                              <p className="text-center font-normal max-w-[800px] text-lg lg:text-xl">
                                   Transform your online presence, boost traffic, and outrank competitors with our advanced SEO services.
                              </p>
                         </div>
                         <Link href={`/signup`} className=" max-w-[400px]" >
                              {/* <PlainButton title="Learn more" /> */}
                              <FilledButton title="Get started for free" />
                         </Link>

                    </div>






                    <div className="flex h-full w-full"
                    // style={{
                    //      backgroundImage: 'url("/bghome.png")',
                    //      backgroundSize: 'auto auto'

                    // }}

                    >
                         <Image src={`/bghome.png`} alt="Home page image" width={1280} height={10} />
                    </div>


               </section>




               <section className=" snap-start h-full w-full p-4 flex flex-col items-center py-24 justify-center bg-lightBg"> <h1 className=" text-darkPrimary text-base font-semibold">Features </h1> <h1 className="pt-3 text-3xl lg:text-4xl font-semibold text-center"> Unleash the power of Webmaxi: Elevate your SEO game</h1> <p className='text-xl pt-5'> Discover a suite of intelligent features designed to propel your website to new heights.</p>

                    {/* <div className='flex flex-col justify-center 2xl:pt-16 pt-10 gap-8 2xl:gap-12'> */}
                    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 justify-items-end md:gap-14 lg:gap-20 2lg:gap-32'>
                         <FeatureCard title="AI-Powered Audits for Precise Insights and Prioritized Actions" description="Our AI algorithms analyze every aspect of your website, providing deep insights into technical issues, content relevance, and user experience." icon="/feature-graph.png" />
                         <FeatureCard title="Smart Keyword Research for Targeted Strategies" description="Uncover hidden gems with our AI-driven keyword research tool, ensuring your content targets the most lucrative and relevant terms." icon="/feature-key.png" />
                         <FeatureCard title="Competitor Analysis to Stay Ahead in Your Niche" description="Understand the strategies that are working for your competitors and gain actionable insights to stay ahead in your niche" icon="/feature-user.png" />
                         <FeatureCard title="Track Rankings and Measure Progress in Real-Time" description="Track your website's performance in real-time for targeted keywords, enabling you to respond swiftly to changes and capitalize on opportunities." icon="/feature-barchart.png" />
                         <FeatureCard title="Actionable Recommendations for Optimal Performance" description="Get personalized recommendations based on your website's unique needs, allowing for a customized and efficient optimization journey." icon="/feature-marked.png" />
                    </div>
                    
                    
                    
                    
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-8">

                         <div className="h-40 w-80 bg-green-400">Hi</div>
                         <div className="h-40 w-80 bg-green-400">Hi</div>
                         <div className="h-40 w-80 bg-green-400">Hi</div>
                         <div className="h-40 w-80 bg-green-400">Hi</div>
                         <div className="h-40 w-80 bg-green-400">Hi</div>
                    </div> */}

                    {/* </div> */}
                    <a href="#faq" className=' pt-16'>
                         <FilledButton title="Learn more" />
                    </a>
               </section>

               {/* <section className="min-h-screen shrink-0 snap-start flex items-center justify-center py-24">
                    Why use webmaxi
               </section> */}

               <section className=" snap-start px-4 min-h-screen w-full flex flex-col items-center pt-18  py-24 justify-start">
                    <div className="text-center">
                         <h1 className=" text-darkPrimary text-base font-semibold "> Why use Webmaxi? </h1>
                         <h1 className="pt-3 text-3xl lg:text-4xl font-semibold lg:hidden">Get more value from your site enhancement strategy  </h1>
                         <h1 className="pt-3 text-3xl lg:text-4xl font-semibold hidden lg:flex">Get more value from your site enhancement strategy  </h1>
                         <p className='text-xl pt-5'>Everything you need to track, manage and boost your site’s SEO. </p>
                    </div>
                    <div className='flex flex-col md:flex-row md:flex-wrap justify-center 2xl:pt-16 pt-10 gap-8 2xl:gap-12'>
                         <WhyUseWemaxiCard title={"Open Hidden Potentials"} description={"Leverage AI insights to identify untapped opportunities in your online strategy."} icon={"/home/openpresent.png"} cat={"/login"} />
                         <WhyUseWemaxiCard title={"Stay Steps Ahead"} description={"Analyze and outperform competitors with our cutting-edge tools and actionable recommendations."} icon={"/home/business-stepping.png"} cat={"/login"} />
                         <WhyUseWemaxiCard title={"Simplified Optimization"} description={"Streamline your SEO efforts with user-friendly features designed for efficiency."} icon={"/home/seo.png"} cat={"/login"} />
                         <WhyUseWemaxiCard title={"Clear Progress Tracking"} description={"Monitor your website's rankings in real-time and witness the impact of your efforts."} icon={"/home/graph.png"} cat={"/login"} />
                    </div>
               </section>



               <section className="h-full px-4 py-4 lg:py-14 gap-14 flex flex-col lg:flex-row justify-between w-full bg-[#F9FAFB]">
                    <div className="flex flex-col w-full pl-0 lg:pl-[112px] pt-14 md:pt-24">
                         <h2 className=' text-3xl md:text-5xl font-semibold text-[#101828]'>Explore our SEO powerhouse</h2>
                         <div className='grid items-start pl-8'>
                              <div className="flex items-center gap-3 pt-8">
                                   <Image src={`/home/check-icon.png`} alt="Marked" height={28} width={28} />
                                   <p className="">30days free trial </p>
                              </div>
                              <div className="flex items-center gap-3 pt-8">
                                   <Image src={`/home/check-icon.png`} alt="Marked" height={28} width={28} />
                                   <p className=""> Access to all features </p>
                              </div>
                              <div className="flex items-center gap-3 pt-8">
                                   <Image src={`/home/check-icon.png`} alt="Marked" height={28} width={28} />
                                   <p className="">Simplified interface </p>
                              </div>


                         </div>
                         <div className="pt-10 flex flex-col md:flex-row gap-2 items-center w-full ">
                              <span className=" w-full lg:w-1/3"><PlainButton title="Learn more" /></span>
                              <span className="w-full"> <FilledButton title="Unlock your website's potential now!" /></span>

                         </div>
                    </div>
                    <div className="flex mt-4 lg:mt-24"
                    // style={{
                    //      backgroundImage: "url('home/dashboard.png')",
                    //      backgroundSize:'contain',
                    //      backgroundRepeat:'no-repeat'
                    // }}
                    >
                         <Image src={`/home/small-dashboard.png`} alt="Dashboard" width={1200} height={682} />
                    </div>
               </section>

               <section id="faq" className="lg:min-h-screen h-full w-full shrink-0 py-24 px-4  snap-start flex flex-col items-center justify-start ">
                    <h1 className="text-center text-4xl font-semibold text-[#101828] "> Frequently asked questions</h1>
                    <p className=" pt-5 text-lg font-normal "> Everything you need to know about the features and billing.</p>
                    <FAQComponent />
               </section>


               <section className="h-[50vh] py-8 px-8 sm:text-center w-full shrink-0 flex flex-col items-center justify-center bg-[#F9FAFB]">
                    <Image src={`/home/still-have-question.png`} alt="More question" height={56} width={56} />
                    <div className="flex flex-col py-8 gap-2 items-center justify-center w-full">
                         <h4 className=" font-medium text-xl text-[#101828]">
                              Still have questions?
                         </h4>
                         <p className=" text-lg text-[#475467] font-normal "> Can’t find the answer you’re looking for? Please chat our friendly team.</p>
                    </div>
                    <span className=""> <FilledButton title="Get in touch" /></span>
               </section>


               <footer>
                    {/* <Footer /> */}
                    <TempFooter/>
               </footer>

          </main>
     )
}
