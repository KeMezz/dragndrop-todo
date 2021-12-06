import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface CardProps {
  isDragging: boolean;
  draggingOver?: string;
}

const Card = styled.li<CardProps>`
  background-color: ${(props) => (props.isDragging ? "#b2bec3" : "#fff")};
  opacity: ${props => props.draggingOver === "trash" ? "0.3" : "1"};
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 10px rgba(0,0,0,0.5)" : "none"};
  transition: opacity, background-color 0.3s ease-in-out;
  color: ${(props) => props.theme.bgColor};
  padding: 16px 30px;
  width: ${(props) => (props.isDragging ? "40px" : "auto")};
  margin: 6px 0;
  border-radius: 10px;
`;

interface DraggableCardInterface {
  toDoID: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoID, toDoText, index }: DraggableCardInterface) {
  return (
    <Draggable draggableId={toDoID + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          draggingOver={snapshot.draggingOver}
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
