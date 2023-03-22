const inputRepo = document.getElementById('repo');
const inputKeyword = document.getElementById("keyword");
const buttonSearch = document.getElementById('search');

buttonSearch.addEventListener('click', function () {
    let urlRepo = encodeURIComponent(inputRepo.value)
    let urlKeyword = encodeURIComponent(inputKeyword.value.trim())
    fetch(`${window.location.href}/search?r=${urlRepo}&kw=${urlKeyword}`)
        .then(response => response.json())
        .then(data => {
            let table = document.createElement("table");
            let index = 1;
            data.forEach(element => {
                let row = table.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = index;
                cell2.innerHTML = element.split("/")[1];
                cell3.innerHTML = `<a href="https://mirrors.tuna.tsinghua.edu.cn/fdroid/${element}">下载</a>`;
                index++;
            });
            let targetElement = document.getElementById("tableTarget");
            targetElement.innerHTML = table.outerHTML;
        });
});
