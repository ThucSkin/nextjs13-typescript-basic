'use client'
import useSWR from "swr";
import AppTable from "../components/app.table"

const BlogsPage = () => {
    const fetcher = (url: string) => fetch(url)
        .then(response => response.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (isLoading) {
        return <div className="">Loading...</div>
    }
    return (
        <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    )
}
export default BlogsPage