import styled from "styled-components";

export const StyledActionButtons = styled.div`
  position: absolute;
  top: 100%;
  left: 15%;
  transform: translate(0%, -20%);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none; /* Disable pointer events when hidden */
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  z-index: 2;

  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
`;
