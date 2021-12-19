export default class TableHandler {

    #keys; // fields of being displayed object
    #rmFunName;
    #bodyElement;

    constructor(headerId, bodyId, keys, sortFun, rmFunName) {
        this.#keys = keys;
        this.#rmFunName = rmFunName;
        const headerElement = document.getElementById(headerId);
        if (!headerElement) {
            throw 'Wrong header id';
        }
        this.#bodyElement = document.getElementById(bodyId);
        if (!this.#bodyElement){
            throw 'Wrong body id';
        }
        fillTableHeader(headerElement, keys, sortFun);

        if (sortFun){
            const columnsEl = document.querySelectorAll(`#${headerId} th`);
            columnsEl.forEach(c => c.addEventListener('click', 
                sortFun.bind(this, c.textContent)));
        }
    }
    clear() {
        this.#bodyElement.innerHTML = ' ';
    }
    addRow(obj, id) {
        this.#bodyElement.innerHTML += `<tr id="${id}">${this.#getRecordData(obj)}</tr>`;
    }
    removeRow(id) {
        document.getElementById(id).remove();
    }
    #getRecordData(obj) {
        return this.#keys.map(k => `<td>${obj[k].constructor.name === "Date" ? 
            obj[k].toISOString().substr(0,10) : obj[k]}</td>`)
            .join('')
            .concat(`<td><i class="bi bi-trash" style="cursor: pointer" onclick="${this.#rmFunName}('${obj.id}')"></i></td>`);
    }
}

function fillTableHeader(headerElement, keys, sortFun) {
    headerElement.innerHTML = getColumns(keys, sortFun);
}

// function getColumns(keys, sortFnName){
//     return keys.map(key => {
//         return !sortFnName ? `<th>${key}</th>` :
//          `<th style="cursor: pointer" onclick="${sortFnName}('${key}')">${key}</th>`
//     }).join('');
// }

function getColumns(keys, sortFun) {
    return keys.map(key => {
        return !sortFun ? `<th>${key}</th>` 
            : `<th style="cursor: pointer">${key}</th>`;
    })
    .join('')
    .concat(`<th></th>`);
}