//@ts-check
import React from "react";

const CreateNote = ({  newTitle, setNewTitle, newUrl, setNewUrl }) => {
    return (
      <>
        <h2>create new</h2>
          <div>
            title
            <input
              type="text"
              value={newTitle}
              name="title"
          autoComplete="off"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={newUrl}
              name="url"
          autoComplete="off"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
      </>
    );
  };

export default CreateNote;
