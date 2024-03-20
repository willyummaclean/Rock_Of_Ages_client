import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const UserRockList = ({ rocks, fetchRocks }) => {
    useEffect(() => {
        fetchRocks()
    }, [])
    
    const navigate = useNavigate()

    const destroyRock = async (rockId) => {

        const response = await fetch(`http://localhost:8000/rocks/${rockId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
                "Content-Type": "application/json"
            }
        })

        if (response.status === 204 ) {

            fetchRocks()
            navigate("/allrocks")
        }
    }


    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <div>{rock.name} ({rock.type.label})</div>
                <div>In the collection of {rock.user.first_name} {rock.user.last_name}</div>
                <div>
                    <button className="border border-solid text-white bg-red-700 p-2" onClick={() => destroyRock(rock.id)}>Delete</button>
                </div>
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}
