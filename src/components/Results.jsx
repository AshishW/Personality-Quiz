import React,{useContext} from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  const {name} = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h3> Btw, Meet your new best furry friend (virtually, of course!).</h3>
          <img src={artwork.message} alt={'random dog image'} />
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}