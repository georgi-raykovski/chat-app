import styled from "styled-components";

export const StyledChatBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 60%;
  overflow-y: auto;
  margin-bottom: 30px;

  &::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #555;
  }

  @media (min-width: 400px) {
    padding: 0px 40px;
  }
`;
