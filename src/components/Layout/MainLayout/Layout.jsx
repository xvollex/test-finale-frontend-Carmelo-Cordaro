
import { useOutlet } from "react-router-dom";
import { Footer } from "../../Footer/Footer";
import { Navbar } from "../../Navbar/Navbar";


export function Layout()
{
    const outlet = useOutlet();

    return (
        <>
            <Navbar/>
            {outlet}
            <Footer/> 
            
            
        </>
    );
}