import { useEffect, useState } from 'react'
import './App.css'

type Room = {
  id: number;
  name: string;
  room_number: string;
  is_available: number;
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [error, setError] = useState("");

  //一覧表示
  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      if (!res.ok) {
        throw new Error("部屋の取得に失敗しました");
      }
      const data: Room[] = await res.json();
      setRooms(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("部屋の取得に失敗しました");
    }
  }
  useEffect(() => {
    fetchRooms()
  }, []);
  return (
    <>
      <div>
        <h1>会議室予約管理システム</h1>


        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.id}({room.room_number})
              {room.is_available ? '：空きあり' : '：使用中'}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App;