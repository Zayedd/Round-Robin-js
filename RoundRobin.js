// Initialize canvas and draw chart
var canvas = document.getElementById("RR");
var ctx = canvas.getContext("2d");
ctx.font = '15px serif';

ctx.moveTo(0, 200);
ctx.lineTo(1200, 200);
ctx.stroke();
ctx.moveTo(0, 160);
ctx.lineTo(1200, 160);
ctx.stroke();

ctx.strokeStyle = "red";
for (var x = 0, num = 1; x < 1240; x += 40, num++) {
    ctx.moveTo(x, 160);
    ctx.lineTo(x, 200);
    ctx.stroke();
    if (x < 1200) {
        ctx.fillText(num, x, 215);
    } else
        ctx.fillText(num, x, 215);
}

// Algorithm
var q;
var processes = [];
var readyQueue = [];

document.getElementById("run").addEventListener('click', function () {
    // Get Quantum Time (q)
    q = Number(document.getElementById("q").value);
    // Get all processes and add them to an array
    var ATs = document.querySelectorAll(".AT");
    var BTs = document.querySelectorAll(".BT");
    for (var i = 0; i < ATs.length; i++) {
        processes.push(
            {
                name: "P" + (i + 1),
                AT: Number(ATs[i].value),
                BT: Number(BTs[i].value),
                color: ATs[i].id
            }
        );
    }
    

    for (var time = 1, x = 1, round = 1; time < 31; time++, x += 40) {
        // Check for newly arrived processes and add them to ready queue
        processes.forEach(function (t, index) {
            if (t.AT === time) {
                readyQueue.push(t);
                processes.splice(index, 1);
            }
        });
        
        // Exit if ready queue is empty
        if (readyQueue.length === 0)
            break;
        
        var head = readyQueue[0];
        if (round <= q) {
            ctx.fillStyle = readyQueue[0].color;
            if (round === 1) {
                ctx.fillText(head.name, x, 150);
            }
            ctx.fillRect(x, 160, 39, 39);
            head.BT--;
            round++;
            if (head.BT === 0) {
                readyQueue.splice(0, 1);
                round = 1;
                continue;
            }
            if (round > q) {
                round = 1;
                readyQueue.push(readyQueue.shift());
            }
            
        }
        
        
    }

    
    // Write Done!
    ctx.fillStyle = "black";
    ctx.font = '25px serif';
    ctx.fillText("Done!", 530, 280);
    
    // Disable run button
    document.getElementById("run").setAttribute("disabled", "true");
});