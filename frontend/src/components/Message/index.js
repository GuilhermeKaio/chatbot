import React from "react";

export default function Message(props) {

  return (
    <section className={'message ' + props.className} style={{order : props.order}}>
      <p>
        {props.children}
      </p>
    </section>
    
  )
}