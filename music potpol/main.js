$(document).ready(function() {
    $('#Guitar').click(function() {
        $('#ifbuton1').css("display", "block");
        $('#ifbuton2').css("display", "none");
        $('#ifbuton3').css("display", "none");
        $('#ifbuton4').css("display", "none");
        console.log('Guitar button clicked');
    });

    $('#Piano').click(function() {
        $('#ifbuton1').css("display", "none");
        $('#ifbuton2').css("display", "block");
        $('#ifbuton3').css("display", "none");
        $('#ifbuton4').css("display", "none");
        console.log('Piano button clicked');
    });

    $('#Drum').click(function() {
        $('#ifbuton1').css("display", "none");
        $('#ifbuton2').css("display", "none");
        $('#ifbuton3').css("display", "block");
        $('#ifbuton4').css("display", "none");
        console.log('Drum button clicked');
    });

    $('#Base').click(function() {
        $('#ifbuton1').css("display", "none");
        $('#ifbuton2').css("display", "none");
        $('#ifbuton3').css("display", "none");
        $('#ifbuton4').css("display", "block");
        console.log('Base button clicked');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audioElements = document.querySelectorAll('audio');
    const tableCells = document.querySelectorAll('#drag td');

    audioElements.forEach(audio => {
        audio.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    tableCells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const audioId = e.dataTransfer.getData('text/plain');
            const audioElement = document.getElementById(audioId);
            if (audioElement) {
                e.target.classList.add('audio-dropped');
                e.target.setAttribute('data-audio-id', audioId);
            }
        });

        cell.addEventListener('click', () => {
            const audioId = cell.getAttribute('data-audio-id');
            if (audioId) {
                const audioElement = document.getElementById(audioId);
                if (audioElement) {
                    audioElement.play();
                }
            }
        });
    });

    document.getElementById('play').addEventListener('click', () => {
        const rows = ['#guitarlist', '#pianolist', '#drumlist', '#baselist'];
        const maxCells = document.querySelectorAll('#drag tr')[0].children.length;

        for (let cellIndex = 0; cellIndex < maxCells; cellIndex++) {
            setTimeout(() => {
                rows.forEach(rowSelector => {
                    const cell = document.querySelector(`${rowSelector} td:nth-child(${cellIndex + 1})`);
                    if (cell) {
                        const audioId = cell.getAttribute('data-audio-id');
                        if (audioId) {
                            const audioElement = document.getElementById(audioId);
                            if (audioElement) {
                                audioElement.play();
                            }
                        }
                    }
                });
            }, cellIndex * 2000);
        }
    });
});
