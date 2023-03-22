const inputRepo = document.getElementById('repo');
const inputKeyword = document.getElementById("keyword");
const buttonSearch = document.getElementById('search');

buttonSearch.addEventListener('click', () => {
    let urlRepo = encodeURIComponent(inputRepo.value)
    let urlKeyword = encodeURIComponent(inputKeyword.value.trim())
    fetch(`${window.location.href}search?r=${urlRepo}&kw=${urlKeyword}`)
        .then(response => response.json())
        .then(data => {
            let table = document.createElement("table");
            let index = 1;
            data.forEach(element => {
                let row = table.insertRow();
                let [cell1, cell2, cell3] = [row.insertCell(0), row.insertCell(1), row.insertCell(2)]
                cell1.innerHTML = index;
                cell2.innerHTML = element.split("/")[1];
                cell3.innerHTML = `<a href="https://mirrors.tuna.tsinghua.edu.cn/fdroid/${element}">下载</a>`;
                index++;
            });
            let targetElement = document.getElementById("tableTarget");
            targetElement.innerHTML = table.outerHTML;
        });
});
inputKeyword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buttonSearch.click();
    }
});