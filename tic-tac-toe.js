  
let input = "4x4 xxxx xxxo x-x- xo-x" 
// let input = "3x3 xxx x- xxx";
//let input = "3x3 oxo xoo oxo";

let inputs = input.split(" ")
const game_size = inputs[0]
const game_sizes = game_size.split("x")

const rows = Number.parseInt(game_sizes[0])
const cols = Number.parseInt(game_sizes[1])

const X = "x"
const O = "o"
const _ = "-"

const games = inputs.slice(1)

function format_pieces(games) {
    let result = [];
    for(let i=0; i< games.length; i++) {
        let plac = games[i].split('')
        result.push(plac)
    }
    return result
}

function validate_result(matches) {
    let result = []
    for (let index = 0; index < matches.length; index++) {
        const element = matches[index];
        if(element.length === rows)
            result = element
    }

    return result
}


function checkForRowWins(games, rows, cols) {
    let row_matches = []
    for(let i=0; i<rows; i++) 
    {
        let pieces = games[i].split('')
        let matching = [];

        for(let j=0; j< pieces.length; ++j) 
        {
            if( j == 0) 
            {
                matching.push(pieces[j])
            }
            
            let last_piece = matching[matching.length - 1];
            if( last_piece !== pieces[j]) 
            {
                break;
            }
            else{
                if( j == (cols - 1)) {
                    row_matches.push(matching)
                    matching = []
                } else {
                    matching.push(pieces[j])
                }
            }    
        }
    }
    
    row_matches = validate_result(row_matches)
    return row_matches
}

function checkForColWins(games, rows, cols) {
    let col_matches = [];
    let result = []
    let pieces = games[0].split('')

    for(let j=0; j < rows; j++) 
    {
        let selected_pcs = pieces[j];
        let col_pieces = [];

        for(let k=0; k<games.length; k++)
        {
            if(col_pieces.length === 0)
            {
                col_pieces.push(selected_pcs)
            }

            if(k === (games.length - 1)) {
                col_matches.push(col_pieces)
                col_pieces = []
            }
     
            if(selected_pcs === games[k].charAt(j)) { //Rn Cn
                col_pieces.push(games[k].charAt(j))
            }   
        }
    }

    result = validate_result(col_matches)

    return result;
}

function checkForDiaWins(games, rows, cols) {
    const DIRECTION_RIGHT = 1
    let dia_matching = []

    // Convert Games to 2D Matrix
    let matrix = []
    for(let i=0; i<games.length; i++)
    {
        matrix.push(games[i].split(''))
    }

    // Diagonal checking from left to right
    let to_right_matching = []
    for (let i = 0; i < matrix.length; i++) {
        if(to_right_matching.length == 0) 
        {
            to_right_matching.push(matrix[i][i])
        } else{
            if(to_right_matching[to_right_matching.length -1] === matrix[i][i])
            {
                to_right_matching.push(matrix[i][i])
            }
        }
    }

    if(to_right_matching.length === matrix.length) dia_matching.push(to_right_matching)

    // Diagonal checking from right to left
    let to_left_matching = []
    for (let i = 0; i < matrix.length; i++) {
        if(to_left_matching.length == 0) 
        {
            to_left_matching.push(matrix[matrix.length-1][i])
        } else{
            if(to_left_matching[to_left_matching.length -1] === matrix[matrix.length-1][i])
            {
                to_left_matching.push(matrix[i][i])
            }
        }
    }

    if(to_left_matching.length === matrix.length) dia_matching.push(to_left_matching)
    

    return validate_result(dia_matching)
}


row_wins = checkForRowWins(games, rows, cols);  // Array
col_wins = checkForColWins(games, rows, cols);  // Array
dia_wins = checkForDiaWins(games, rows, cols);  // Array

console.log("row_wins", row_wins)
console.log("col_wins", col_wins)
console.log("dia_wins", dia_wins)
