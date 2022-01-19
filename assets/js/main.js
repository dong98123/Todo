const addToDo = document.querySelector(".add--todo--form");
const btn_add = document.querySelector(".btn-add");
const add_title = document.querySelector("#title");
const add_desc = document.querySelector("#desc");
const desc_wrapper = document.querySelector(".desc-wrapper");
const title_wrapper = document.querySelector(".title-wrapper");
const btn_add_wrapper = document.querySelector(".btn-wrapper");
const todo_wrapper = document.querySelector(".todo-wrapper");
const date = new Date();
let time = {
	day: () => {
		if (date.getDay() < 10) {
			return `0${date.getDay()}`;
		} else {
			return date.getDay();
		}
	},
	month: () => {
		if (date.getMonth() < 10) {
			return `0${date.getMonth() + 1}`;
		} else {
			return date.getMonth() + 1;
		}
	},
	year: date.getFullYear(),
	hour: () => {
		if (date.getHours() < 10) {
			return `0${date.getHours()}`;
		} else {
			return date.getHours();
		}
	},
	minute: () => {
		if (date.getMinutes() < 10) {
			return `0${date.getMinutes()}`;
		} else {
			return date.getMinutes();
		}
	},
	second: () => {
		if (date.getSeconds() < 10) {
			return `0${date.getSeconds()}`;
		} else {
			return date.getSeconds();
		}
	},
};
let ToDoList = [];
//create cicle button
desc_wrapper.onfocus = () => {
	let btnHeight = btn_add.offsetHeight;
	btn_add.style.width = `${btnHeight}px`;
};

//render todolist
function render() {
	let html = `
    ${ToDoList.map(
			(todo, index) => `<div class = 'todo_item_wrapper'><div class="todo_item">
                    <div class = 'bg-transparent'><textarea  readonly class="title bg-transparent" cols =20 rows ='1'>${todo.title}</textarea></div>
                    <div class = 'bg-transparent'><textarea class="desc bg-transparent" readonly cols="20" rows="3">${todo.desc}</textarea></div>
                    <div class = 'row center'>
                    <button class = 'btn btn-save d-none'><i class="far fa-save"></i></button>
                    <button class = 'btn btn-check'><i class="fas fa-check"></i></button>
                    <button title = 'edit your task' class = 'btn btn-edit'><i class="far fa-edit"></i></button>
                    <button class="btn btn-del"><i class="far fa-trash-alt"></i></button>
                </div>
            </div></div>`
		)}
    `;
	todo_wrapper.innerHTML = html;

	const del_btns = document.querySelectorAll(".btn-del");
	const edit_btns = document.querySelectorAll(".btn-edit");
	const check_btns = document.querySelectorAll(".btn-check");
	const btn_saves = document.querySelectorAll(".btn-save");
	const descs = document.querySelectorAll(".desc ");
	const titles = document.querySelectorAll(".title");
	//delete item

	del_btns.forEach((element, i) => {
		element.onclick = () => {
			ToDoList.splice(i, 1);
			render();
		};
	});
	//edit desc
	edit_btns.forEach((element, i) => {
		element.onclick = () => {
			descs[i].removeAttribute("readonly");
			titles[i].removeAttribute("readonly");
			btn_saves[i].classList.remove("d-none");
		};
	});
	btn_saves.forEach((element, i) => {
		element.onclick = () => {
			descs[i].setAttribute("readonly", "");
			titles[i].setAttribute("readonly", "");
			element.classList.add("d-none");
			let newElement = {
				title: titles[i].value,
				desc: descs[i].value,
			};
			ToDoList[i] = { ...newElement };
		};
	});
	check_btns.forEach((element, i) => {
		element.onclick = () => {
			descs[i].classList.add("line-throught");
			titles[i].classList.add("line-throught");
		};
	});
}
render();

//submit form
addToDo.onsubmit = () => {
	event.preventDefault();
	if (add_title) {
		ToDoList.unshift({
			title: add_title.value,
			desc: add_desc.value,
		});
		render();
		addToDo.reset();
	}
};
