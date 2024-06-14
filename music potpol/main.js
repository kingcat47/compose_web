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
        const tableCells = document.querySelectorAll('#drag td'); // 변경된 부분: 모든 셀(td)을 선택합니다.
        const numRows = document.querySelectorAll('#drag tr').length; // 추가된 부분: 테이블의 전체 행 개수를 가져옵니다.
    
        tableCells.forEach((cell, cellIndex) => {
            setTimeout(() => {
                const audioId = cell.getAttribute('data-audio-id');
                if (audioId) {
                    const audioElement = document.getElementById(audioId);
                    if (audioElement) {
                        audioElement.play();
                    }
                }
            }, (cellIndex % numRows) * 2100); // 변경된 부분: 열 인덱스(cellIndex)를 전체 행 수(numRows)로 나누어 계산하여 세로 방향으로 재생되도록 합니다.
        });
    });
});
