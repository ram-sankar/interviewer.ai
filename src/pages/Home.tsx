import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, where, query, getDocs, orderBy } from "firebase/firestore"; 
import { Button } from "@mui/material";

import { Navbar } from "../components/Navbar";
import { db } from "../api/firebase";
import { INDICES } from "../shared/constants";
import { copyToClipboard, getFormattedDate, getLoggedInUserDetails } from "../shared/helper";
import { QuestionObj } from "../shared/modal";
import "./styles.css"


export const Home = () => {
    const [questionList, setQuestionList] = useState<QuestionObj[]>([])

    useEffect(() => {
        fetchLoggedInUsersQuestionList();
    }, [])

    const generateQuery = () => {
      const userDetails = getLoggedInUserDetails()
      return query(
        collection(db, INDICES.QUESTIONS), 
        where("email", "==", userDetails.email),
        orderBy("timestamp", "desc")
      )
    }

    const fetchLoggedInUsersQuestionList = async () => {
        const q = generateQuery();
        const querySnapshot = await getDocs(q);
        const dataList: QuestionObj[] = []
        querySnapshot.forEach((doc) => {
            const obj: any = {...doc.data()}
            dataList.push({
                id: doc.id,
                ...obj
            })
        });
        setQuestionList(dataList)
    }

    const RenderTable = () => {
        const copyQuestionURL = (question: QuestionObj) => {
          const url = "http://localhost:3001/test/" + question.id
          copyToClipboard(url)
        }

        return (
            <TableContainer component={Paper} className="tableContainer">
              <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Topic</StyledTableCell>
                    <StyledTableCell align="right">YoE</StyledTableCell>
                    <StyledTableCell align="right">No. of Questions</StyledTableCell>
                    <StyledTableCell align="right">Created On</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionList.map((question) => (
                    <StyledTableRow key={question.id}>
                      <StyledTableCell component="th" scope="row">
                        {question.topic}
                      </StyledTableCell>
                      <StyledTableCell align="right">{question.yoe}</StyledTableCell>
                      <StyledTableCell align="right">{question.numberOfQuestions}</StyledTableCell>
                      <StyledTableCell align="right">{getFormattedDate(question.timestamp)}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained" className="proceedBtn" onClick={() => copyQuestionURL(question)}>
                          Copy Test URL
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
    }

    return (
    <div>
        <Navbar />
        {RenderTable()}
    </div>
)};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];