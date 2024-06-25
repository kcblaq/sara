import TempFooter from '../component/home/footer/TempFooter';
import Nav from '../component/home/nav/Nav';



interface Props {
    children: JSX.Element
}

export default function Layout({ children}: Props) {
    return (
        <div className="h-full grid w-full" suppressHydrationWarning>
            <div className="flex h-[72px]">
                <Nav />
            </div>
            <div className="grid">
                {children}
            </div>
            <TempFooter/>
        </div>
    );
}
