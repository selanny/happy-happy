const candle = document.getElementById('candle');

const cols = 4;          // столбцов в спрайте
const rows = 4;          // строк
const frameW = 192;      // ширина одного кадра (px)
const frameH = 192;      // высота кадра
const burnFrames = 12;   // 0-11 — мерцание
const totalFrames = 16;  // 0-15 — вся последовательность
const fps = 12;          // кадров в секунду

let frame = 0;
let burning = true;

/* вывод нужного кадра */
function showFrame(n){
  const x = (n % cols) * frameW;
  const y = Math.floor(n / cols) * frameH;
  candle.style.backgroundPosition = `-${x}px -${y}px`;
}

/* бесконечное "мерцание" (кадры 0-11) */
let burnLoop = setInterval(()=>{
  showFrame(frame);
  frame = (frame + 1) % burnFrames;
}, 1000 / fps);

/* по клику: останавливаем мерцание и проигрываем кадры 12-15 один раз */
candle.addEventListener('click', ()=>{
  if(!burning) return;          // уже потухла
  burning = false;

  clearInterval(burnLoop);      // стоп мерцание

  let f = burnFrames;           // начинаем с кадра 12
  const extinguish = setInterval(()=>{
    showFrame(f);
    f++;
    if(f >= totalFrames){       // дошли до последнего (15)
      clearInterval(extinguish);
    }
  }, 1000 / fps);
});
