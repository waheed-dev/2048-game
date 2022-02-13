import React, { useEffect, useState } from "react";

import {
    getEmptyBoard,
    generateRandom,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    isOver,
    checkWin
} from "./gameBoard";
import {Box, Button, Text} from "@chakra-ui/react";

const Cell = ({ number }) => {
    return (
        <Box className={`cell cell-${number}`}>{number > 0 ? number : ""}</Box>
    );
};
let GameOVer
const GameController = () => {
    const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
    const reset = () => {
        updateBoard(generateRandom(getEmptyBoard()))
        GameOVer = ''
    }
    const checkEndGame = () => {
        if (checkWin(board)) {
            GameOVer = "You win"
        } else if (isOver(board)) {
            GameOVer = 'you lost'
        }
    };
    const left = () => {
        const newBoard = moveLeft(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const right = () => {
        const newBoard = moveRight(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const up = () => {
        const newBoard = moveUp(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const down = () => {
        const newBoard = moveDown(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                up();
                break;
            case "ArrowDown":
                down();
                break;

            default:
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize={['4xl','3xl','5xl','6xl']}
                    fontWeight='extrabold'
                >
                    2048
                </Text>
                <Text>{GameOVer}</Text>
            <Box bgColor={'blackAlpha.500'} width={['sm','md','lg','2xl']} mt={'50'} className="game-board">
                {board.map((row, i) => {
                    return (
                        <Box key={`row-${i}`} className="row">
                            {row.map((cell, j) => (
                                <Cell key={`cell-${i}-${j}`} number={cell} />
                            ))}
                        </Box>
                    );
                })}
            </Box>
                <Button onClick={reset} colorScheme={'red'} mt={'4'}>Reset</Button>
            </Box>
        </>
    );
};

export default GameController;
