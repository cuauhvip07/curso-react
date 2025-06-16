import Logo from "@/components/iu/Logo";
import ToastNotification from "@/components/iu/ToastNotification";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">

                <div className="bg-purple-950 flex justify-center lg:bg-[url(/grafico.svg)] lg:bg-no-repeat lg:bg-[length:30rem] bg-left-bottom">
                    <div className=" w-96 py-10 lg:py-20">
                        <Logo />
                    </div>
                </div>
                <div className=" p-10 lg:py-28">
                    <div className=" max-w-3xl mx-auto">
                        {children}
                    </div>
                </div>

            </div>

            <ToastNotification/>
        </>


    );
}
