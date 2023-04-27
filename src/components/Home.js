import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { TabMenu } from 'primereact/tabmenu';
import Users from "./Users";
import Activities from "./Activities";

import axios from '../api/axios';
import Scoreboard from "./Scoreboard";




const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const [activeIndex, setActiveIndex] = useState(0);
    const [history, setHistory] = useState();
    const [assignedTask, setAssignedTask] = useState();
    // const axiosPrivate = useAxiosPrivate();


    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const taskList = [{ name: 'Prince Peter', quiz: 5, tech: 3, nonTech: 3 },
    { name: 'Rohith R', quiz: 5, tech: 3, nonTech: 3 },
    { name: 'Elvin S', quiz: 5, tech: 3, nonTech: 3 },
    { name: 'Jackson John', quiz: 5, tech: 3, nonTech: 3 },
    { name: 'Ben Sam', quiz: 5, tech: 3, nonTech: 3 }];


    const assignedList = [{ name: 'John', task: 'Quiz' }]

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home' },
        { label: 'Users', icon: 'pi pi-fw pi-calendar' },
        { label: 'Activities', icon: 'pi pi-fw pi-pencil' },
        { label: 'Scoreboard', icon: 'pi pi-fw pi-file' },
    ];

    const generate_next_week = async () => {
        try {
            const response = await axios.post('/task');
            console.log(response.data);
            setAssignedTask(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="logout">
                <Button label="Logout" severity="warning" rounded text raised size="small" onClick={signOut}></Button>
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

            {activeIndex === 0 && <>
                <div style={{ margin: 30, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: 10, overflow: 'hidden', padding: 20, border: '2px gray dashed' }}>
                    <h2 style={{ marginBottom: 5 }}>Task statistics</h2>
                    <DataTable value={history} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Name" />
                        <Column field="quiz" header="RO Quiz" />
                        <Column field="tech" header="Tech Presentation" />
                        <Column field="nonTech" header="NON-Tech Presentation" />
                    </DataTable>
                </div>

                <div style={{ width: 'fit-content', margin: 30, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: 10, overflow: 'hidden', padding: 20, border: '2px gray dashed' }}>
                    <Button style={{ marginBottom: 20 }} onClick={generate_next_week}>Generate Next</Button>
                    <DataTable value={assignedTask} tableStyle={{ minWidth: '20rem', width: '20%' }}>
                        <Column field="task_name" header="Name" />
                        <Column field="user_name" header="Task" />
                    </DataTable>
                </div>
            </>}
            {activeIndex === 1 && <Users />}
            {activeIndex === 2 && <Activities />}
            {activeIndex === 3 && <Scoreboard />}

        </div>

    )
}

export default Home
