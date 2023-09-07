


export const metadata = {
    title: 'Blogs',
    description: 'This is the best',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
