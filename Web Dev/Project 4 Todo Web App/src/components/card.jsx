import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Button from 'react-bootstrap/Button';


const Card = (props) => {
 

  return (
    <>
        <div className='cardContainer'>

          <p className='pinButton' onClick={() => props.onpin(props.id)}>
            {props.isPinned ? "📌 Pinned" : "📍 Pin"}
          </p>


          {props.time && (
            <p className='timeStamp'>
              {props.edited ? "Edited" : "On"}: {new Date(props.time).toDateString()} at {new Date(props.time).toLocaleTimeString()}
            </p>
          )}


          {props.isEditing ? (
            <>
              <textarea
                value={props.editData.content}
                onChange={(e) => props.setEditData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Edit content"
                rows="3"
              />
              <Button variant="success" onClick={() => props.onsave(props.id, props.editData)}>Save</Button>
              <Button variant="danger" onClick={props.canceledit}>Cancel</Button>
            </>
          ) : (
            <>
              <CiEdit className='editButton' onClick={() => props.onedit(props.id, props.title, props.content)} />
              <h2>{props.title }</h2>
              <p className='cardContent'>{props.content === ""?"No Contnet Available..": props.content}</p>
            </>
          )}

          <MdDelete onClick={() => props.ondelete(props.id)} className='deletebutton'/>
          <p className='pendingTask' onClick={ () => props.ontoggle(props.id) }>
            {props.isPending ? <><FaClockRotateLeft /> Pending</> :<><IoCheckmarkDoneCircle /> Completed</> }
          </p>
        </div>

    
    </>
  )
}

export default Card