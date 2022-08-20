import React,{useState} from 'react'
const photos = {
    id: 1,
    name: "ken",
    email: "@gmail.com"
}


function MappingObj(){
const proPhotos = Object.entries(photos)
console.log(proPhotos)

    return(
                <div>
                    {proPhotos.map((proPhoto,value)=>{
                        return <div key={value}>
                            <h2>{proPhoto === "id" && proPhoto.id}</h2>
                            {/* <h2>{proPhoto.name} {value.name}</h2>
                            <h2>{proPhoto.email} {value.email}</h2> */}

                            </div>
                    })}
                </div>
    )
}

export default MappingObj