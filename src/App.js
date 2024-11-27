// App.js
import React, { useEffect } from 'react';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import './App.css';
import Casella from './Casella';

const db = new Dexie('calendarioAvvento');
db.version(1).stores({
  caselle: '++id, day, isOpen'
});

function App() {
  const allCaselle = useLiveQuery(() => db.caselle.toArray());

  useEffect(() => {
    const initCaselle = async () => {
      if (!allCaselle.length) {
        const newCaselle = Array.from({ length: 24 }, (_, i) => ({ day: i + 1, isOpen: false }));
        await db.caselle.bulkPut(newCaselle);
      }
    };
    initCaselle();
  }, [allCaselle]);

  const handleOpen = async (id) => {
    await db.caselle.update(id, { isOpen: true });
  };

  const bgUrl = "./img/deco.png";

  return (
    <main className='h-dvh w-screen flex flex-col charm-regular'>
      <h1 className='text-center font-bold text-2xl md:py-2 md:text-5xl w-full bg-center bg-cover' 
      style={{ backgroundImage: `url(${bgUrl}`}}>
      Calendario dell'Avvento degli Amichi</h1>
    <div className="h-full w-full p-2 grid grid-cols-4 md:grid-cols-6 gap-2">
      {allCaselle?.map((casella) => (
        <Casella key={casella.id} id={casella.id} day={casella.day} isOpen={casella.isOpen} handleOpen={handleOpen} />
      ))}
    </div>
      </main>
  );
}

export default App;