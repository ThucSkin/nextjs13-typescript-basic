"use client";
import { Table, Button } from "react-bootstrap";
import '../globals.css'
import CreateModal from "./create.modal";
import { useState } from 'react'
import UpdateModal from "./update.modal";
import Link from "next/link";
import { mutate } from "swr";
import { toast } from "react-toastify";

interface IProps {
  blogs: IBlog[]
}

function AppTable(props: IProps) {
  const { blogs } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const hanldeDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete id = ${id}`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'content-type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => {
          toast.success('Deleted Successfully')
          mutate("http://localhost:8000/blogs");
        })
    }
  }

  return (
    <>
      <div className="table-header">
        <h2>Table Blogs</h2>
        <Button variant="secondary"
          onClick={() => setShowModal(true)}>Add new</Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs && blogs.length > 0 && blogs.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link className="btn btn-primary" href={`/blogs/${item.id}`}>View</Link>
                  <Button variant="warning" className="mx-3"
                    onClick={() => {
                      setSelectedBlog(item)
                      setShowModal(true)
                    }}>
                    Edit
                  </Button>
                  <Button onClick={() => hanldeDelete(item.id)} variant="danger">Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <UpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedBlog={selectedBlog}
        setSelectedBlog={setSelectedBlog}
      />
    </>
  );
}

export default AppTable;
