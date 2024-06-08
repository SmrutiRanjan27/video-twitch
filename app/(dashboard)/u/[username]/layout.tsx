import { getSelfByUserName } from "@/lib/auth-service"
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { Suspense } from "react";
import { WrapperSkeleton } from "./_components/sidebar/wrapper";

interface CreatorLayoutProps {
    params: {
        username: string
    },
    children : React.ReactNode
}

const CreatorLayout = async ({
    params,
    children
} : CreatorLayoutProps) => {
    const self = await getSelfByUserName(params.username);

    if (!self) {
        redirect("/")
    }

    return (
        <>
            <Navbar/>
            <div className="flex h-full pt-20">
                <Suspense fallback={<WrapperSkeleton />} >
                    <Sidebar />
                </Suspense>
                <Container>
                    {children} 
                </Container>
            </div>
        </>
    )
}

export default CreatorLayout;