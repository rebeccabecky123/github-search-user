
import React,{useState, useEffect }  from 'react'

const CandyCounter  = () => {
 const [candies, setCandies] = useState(0);
 
 useEffect(() => {
  alert (`Yeah! Now i have many money to buy ${candies}candies`);
 }, [candies]);

 
  if (candies === 20) {
    alert("You earned a BIG reward! 🎁🍭");
  } else {
    console.log("Keep going! You're close to your reward! 💪🍬");
  }



return (
      
          

        <div className='bg-yellow-600 bg-gradient-to-tr from-slate-50 to-yellow-500 font-semibold flex flex-col items-center justify-center h-screen text-center font-sans '>
            <h1 className='text-2xl font-bold mb-4'>I have {candies} Candies </h1>
            <p className='text-2xl font-bold text-gray-500 mb-4'>If you love candoy this is your time to get more don't lose the chance  😊🙌 </p>
          <button  onClick={() => setCandies (candies + 1)} className='bg-blue-600 hover:bg-blue-900 text-center rounded-lg px-2 py-2 mb-4'>
               give me Candy 🍭
            </button>
            <p className='text-2xl font-bold text-gray-500 mb-4'>And if you don't love it show it and remove 😹</p>

            <button onClick={() => setCandies(candies-1)} className='bg-yellow-400 hover:bg-yellow-800 rounded-lg px-2 py-2 mb-4'> drop Candy 😪🍬</button>
            <p className='text-2xl font-bold mb-4 text-gray-500 '>But if you will like to start by making an choise do it reset it 😲🤭 </p>
            <button onClick={() => setCandies(0)} className='bg-pink-400 hover:bg-pink-800 rounded-lg px-2 py-2 mb-4'>Reset0️⃣</button>
            
        </div>
)
  
}

export default CandyCounter 

