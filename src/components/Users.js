import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <div style={{ margin: 30, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: 10, overflow: 'hidden', padding: 20, border: '2px gray dashed' }}>
                <h2 style={{ marginBottom: 5 }}>Users List</h2>
                <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" />
                    <Column field="quiz" header="RO Quiz" />
                    <Column field="tech" header="Tech Presentation" />
                    <Column field="nonTech" header="NON-Tech Presentation" />
                </DataTable>
            </div>
        </article>
    );
};

export default Users;
