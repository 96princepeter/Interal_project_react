import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Activities = () => {
    const [activities, setActivities] = useState();
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
                isMounted && setActivities(response.data);
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
                <h2 style={{ marginBottom: 5 }}>Activity List</h2>
                <DataTable value={activities} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" />
                    <Column field="quiz" header="RO Quiz" />
                    <Column field="tech" header="Tech Presentation" />
                    <Column field="nonTech" header="NON-Tech Presentation" />
                </DataTable>
            </div>
        </article>
    );
};

export default Activities;
