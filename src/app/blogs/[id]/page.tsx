'use client'
import Link from 'next/link';
import { Container, Button, Col, Form, Row } from 'react-bootstrap';
import useSWR, { Fetcher } from 'swr';

const DetailBlog = ({ params }: { params: { id: string } }) => {

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url)
        .then(response => response.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${params.id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (isLoading) {
        return <div className="">Loading...</div>
    }

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>View blog</h3>
            <Container className='mt-5'>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={data?.title || ''} />
                        </Form.Group>


                        <Form.Group as={Col}>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={data?.author || ''} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} type="text" value={data?.content || ''} />
                    </Form.Group>

                    <Link className='btn btn-primary' href={`/blogs`}>
                        back
                    </Link>
                </Form>
            </Container>
        </>
    )
}

export default DetailBlog