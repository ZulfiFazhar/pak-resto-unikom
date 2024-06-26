import React from 'react'

function MenuDipilihCards({menuDipesan, setMenuDipesan}) {

    const handleClickRadioSelectOpsi = (id, value) => {
        const newMenuDipesan = menuDipesan.map(menu => {
            if(menu.id == id){
                menu.opsiDipilih = value
            }
            return menu
        })
        
        setMenuDipesan(md => newMenuDipesan)
    }

    const handleClickReduceAddSelectedItem = (id, action) => {
        let indexToRemove = -1
        let newMenuDipesan = menuDipesan.map((menu, i) => {
            if(menu.id == id){
                if(action == 'add'){
                    menu.jumlah += 1
                }else if(action == 'reduce'){
                    menu.jumlah -= 1
                }
            }
            if(menu.jumlah <= 0){
                indexToRemove = i
            }
            return menu
        })
        if(indexToRemove > -1){
            newMenuDipesan.splice(indexToRemove, 1)
        }
        
        setMenuDipesan(md => newMenuDipesan)
    }

  return (
    <div className='mt-4 flex flex-col *:mb-2'>
            {menuDipesan.map(item => {
                return (
                    <div key={item.id} className=' w-80 flex justify-between items-center border border-black p-2 rounded-md'>
                        <div className='flex flex-col'>
                            <h4>{item.nama_masakan}</h4>

                            <div className='flex *:mr-2 *:text-sm'>

                            {item.opsi != null &&
                                item.opsi.one.map(itm => {
                                    return (
                                        <label key={itm}>
                                            <input 
                                                type='radio'
                                                value={itm}
                                                checked={item.opsiDipilih == itm}
                                                onChange={(e) => handleClickRadioSelectOpsi(item.id, e.target.value)}
                                            />
                                            {itm}
                                        </label>
                                    )
                                })
                                
                            }

                            </div>
                        </div>

                        <div className=' w-20 flex justify-between border border-black rounded-full'>
                            <button 
                                className='px-2 border-r border-black rounded-full'
                                onClick={() => handleClickReduceAddSelectedItem(item.id, 'reduce')}>
                            -</button>

                            <span>{item.jumlah.toLocaleString()}</span>

                            <button 
                                className='px-2 border-l border-black rounded-full'
                                onClick={() => handleClickReduceAddSelectedItem(item.id, 'add')}>
                            +</button>
                        </div>

                    </div>
                )
            })}
        </div>
  )
}

export default MenuDipilihCards