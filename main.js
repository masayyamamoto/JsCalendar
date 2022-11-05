'use strict';
console.clear();
{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
//--------------------------------
  function getCalendarHead() {
    const  dates = [];
    const  d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i + 1 < n; i++) { //i + 1 が月曜始まりの印（普通はiのみ）
      // 30
      // 29, 30
      // 28, 29, 30 と増えていく(unshift)
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }
//--------------------------------
  function getCalendarBody() {
    const dates = []; // dateは日付。dayが曜日を表す。なのでdaysではない。
    const lastDate = new Date(year, month + 1, 0).getDate();
    //次のループでその月の日にちの数だけ回したいのでlastDateを決めている。
    //月は０始まりだが、日付は１始まりなので０を指定すると前月の末日になる。
    for (let i = 1; i <= lastDate; i++) {
      dates.push({date: i, isToday: false, isDisabled: false,});
    }
    // console.log(dates);

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
      // console.log(new Date(year,month + 1, 0)); //上で指定した月の月末日。
  }
//--------------------------------
  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay + 1; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    // console.log(dates);
    return dates;
  }
//--------------------------------

function clearCalendar() {
  //月変更の際にクリアする---ここから-----
  const tbody = document.querySelector('tbody'); 
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

function renderTitle() {
  const title = `${year}/${String(month + 1).padStart(2, ('0'))}`;
  document.getElementById('title').textContent = title;
  //月変更の際にクリアする---ここまで-----
}

function renderWeeks() {
  const dates = [
    ...getCalendarHead(),
    ...getCalendarBody(),
    ...getCalendarTail(),
  ];
  // 週ごとに分けていく
  const weeks = [];
  const weeksCount = dates.length / 7; //週の数は７で割れば出る
  
  for (let i = 0; i < weeksCount; i++) {
    weeks.push(dates.splice(0, 7))
  }
  
  weeks.forEach(week => {
    const tr = document.createElement('tr');
    week.forEach(date => {
      const td = document.createElement('td');
  
      td.textContent = date.date;
      if (date.isToday) {
        td.classList.add('today');
      }
      if (date.isDisabled) {
        td.classList.add('disabled');
      }
  
      tr.appendChild(td);
    })
    
    document.querySelector('tbody').appendChild(tr)
  });
}

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks() 
  }

//--------------------------------
//クリックイベントを追加していく
  document.getElementById('prev').addEventListener('click', () => {
    month--; //月を一つマイナスしていく
    if (month < 0) { //1月より前は前年。年を一つマイナス、12月から始める。
      year--;
      month = 11;
    }
    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++; //月を一つプラスしていく
    if (month > 11) { //12月より先は来年。年を一つプラスして1月から始める。
      year++;
      month = 0;
    }
    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    
    createCalendar();
  });


  createCalendar();
  // getCalendarBody();
  // getCalendarHead();
  // getCalendarTail();


}