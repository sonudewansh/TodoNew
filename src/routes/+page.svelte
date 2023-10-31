<script>
    $: todos = [];
    let title = "";
    $:console.log("Title: ",title);
    const handleAddTodoBtn = async()=>{
        fetch("http://localhost:5173/api/add-todo", {
            method:"POST",
            body:JSON.stringify({
                title,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
        console.log("Response Data: ", data);
        todos = [...todos, data];
        title = "";
      });
    }

    const getTodo = () => {
    fetch("http://localhost:5173/api/get-todo")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data: ", data);
        todos = data;
      });
    };
    getTodo();


    const handleDeleteTodoBtn = (id) => {
    fetch("http://localhost:5173/api/delete-todo", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Data: ", data);
        let new_todos = todos.filter((item) => item._id !== id);
        todos = new_todos;
      });
    };

    let editTodoId = "";
    const handleEditBtnClick = (id) => {
    editTodoId = id;

    let todo = todos.find((item) => item._id === id);
    console.log("Todo: ", todo);
    title = todo.title;
    };
    const haneleEditSubmitBtnClick = () => {
    fetch("http://localhost:5173/api/edit-todo", {
      method: "POST",
      body: JSON.stringify({
        id: editTodoId,
        title: title,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
    console.log("Data: ", data);
    todos = todos.map((item) => {
        if (item._id === editTodoId) {
            item.title = data.title;
            }
            return item;
            });
            title = "";
            editTodoId = "";
        });
    };
</script>

<main>
    <div class="mx-1 pt-[40px] lg:m-[10px] lg:p-[20px]">
        <p class="text-center text-blue-900 font-bold text-[40px] underline decoration-solid decoration-sky-500">ToDo List</p>
        <div class="flex justify-center mt-20">
            <p class="rounded-md text-blue-900 font-bold text-center sm:text-left sm:text-lg md:text-xl lg:text-2xl sm:pt-1 pt-1 mr-3 border-2 border-sky-500">Enter your List</p>
            <input type="text" bind:value={title} class="sm:text-xs text-gray-900 rounded-lg w-[50vw] p-2 mr-3 border-2 border-sky-500" placeholder="Add Todo"/>
            {#if editTodoId.length}
            <button type="button" class="sm:text-xs px-2 my-1 border-2 border-blue-900 rounded-md" on:click={haneleEditSubmitBtnClick}>Edit</button>
            {:else}
            <button class="sm:text-xs px-2 border-2 border-blue-900 rounded-md" on:click={handleAddTodoBtn} type="button">Save</button>
            {/if}
        </div>
    </div>
    
    {#each todos as toDo, i}
        <div class="mt-[20px] flex justify-around w-[100vw]">
            <div class="w-[50vw] flex">
                <span class="sm:text-xs mr-2 py-2">{i+1}.</span>
                <span class="sm:text-xs w-[50vw] py-2">{toDo.title}</span>
                </div>
            <div>
                <button class="sm:text-xs px-2 my-1 border-2 border-blue-900 rounded-md" on:click={(e) => handleEditBtnClick(toDo._id)}>Edit</button>
                <button class="sm:text-xs ml-2 px-2 my-1 border-2 border-blue-900 rounded-md" on:click={(e) => handleDeleteTodoBtn(toDo._id)}>Delete</button>
            </div>
        </div>
    {/each}
</main>

