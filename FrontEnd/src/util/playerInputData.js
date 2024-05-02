const player01 = document.getElementById('player-1-name')
const player02 = document.getElementById('player-2-name')

const inputPlayerElement = document.getElementsByClassName('input-player')
const playerNameSubmitBtn = inputPlayerElement[0].querySelector('input[type=submit]')   

const URL_UPDATE_PLAYERNAME = 'http://localhost:3000/start_game/'; //waiting for URL from BackEnd
const URL_GET_GAMEBOARD = 'http://localhost:3000/gameboard/'; //waiting for URL from BackEnd

let playerName1
let playerName2

const handlePlayerInput = playerNameSubmitBtn.addEventListener('click', async(e) => {
    const playerNameList= {
        player1_name: player01.value,
        player2_name: player02.value
    }
    e.preventDefault()
    const gameboardId = await inputPlayerData(URL_UPDATE_PLAYERNAME, playerNameList)
    const gameboardArray = await getGameBoard(URL_GET_GAMEBOARD,gameboardId)
})

const inputPlayerData = async (URL, data) => {
    console.log(data);
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
        if (response.ok) {
            const result = await response.json()
            const gameId = result.gameid
            console.log(result);
            return gameId
        } else {
            console.log('Fetch API FAIL')
        } 
    } catch (error) {
        console.error(error);
    }
}

const getGameBoard = async (URL, id) => {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        if (response.ok) {
            const result = await response.json()
            console.log(result);
        } else {
            console.log('Fetch API FAIL')
        } 
    } catch (error) {
        console.error(error);
    }
}



