
import Footer from '../component/home/footer/Footer';
import Nav from '../component/home/nav/Nav';



interface Props {
    children: JSX.Element
}

export default function Layout({ children}: Props) {
    return (
        <main className="h-full grid w-full">
            <div className="flex h-[72px]">
                <Nav />
            </div>
            <div className="grid">
                {children}
            </div>
            <Footer/>
        </main>
    );
}
