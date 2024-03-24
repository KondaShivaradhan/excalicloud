
import React, { useState } from 'react';
import { MemoryRouter } from "react-router-dom"
import { AuthWrapper } from '~routes';
import "./style.css"

function IndexPopup() {
  return (

    <MemoryRouter>
      <AuthWrapper />
    </MemoryRouter>
  );
}


export default IndexPopup
