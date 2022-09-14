import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'

export default function Issue() {
  const [issueList, setIssueList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getIssuesApi = async page => {
    setLoading(true)
    return await axios
      .get(process.env.REACT_APP_GITHUB_URL, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
        params: {
          page: page,
        },
      })
      .then(res => {
        setIssueList(
          res.data.sort((a, b) => {
            return b.comments - a.comments
          }),
        )
        setLoading(false)
      })
  }
  useEffect(() => {
    getIssuesApi(1)
  }, [])

  // 5번째줄만? 5번째마다???
  // for (let i = 4; i <= issueList.length; i += 5) {
  //   issueList.splice(i, 0, { url: 'https://thingsflow.com/ko/home' })
  // }
  issueList.splice(4, 0, { id: '', url: 'https://thingsflow.com/ko/home' })

  const handleNavigate = issueNumber => {
    navigate(`/${issueNumber}`, { state: issueNumber })
  }

  return !loading ? (
    <IssueListWrapper>
      <IssueList>
        {issueList.map(oneIssue =>
          oneIssue.id ? (
            <OneIssue onClick={() => handleNavigate(oneIssue.number)} key={oneIssue.id}>
              <IssueTitle>{oneIssue.title}</IssueTitle>
              <IssueEtc>
                <IssueWriter>작성자 : {oneIssue.user.login}</IssueWriter>
                <IssueDate>작성일 : {oneIssue.updated_at.substr(0, 10)}</IssueDate>
                <IssueComments>코멘트 : {oneIssue.comments}</IssueComments>
              </IssueEtc>
            </OneIssue>
          ) : (
            <OneIssue key={oneIssue.id}>
              <AdImageWrapper
                onClick={() => window.open('https://thingsflow.com/ko/home', '_blank')}
              >
                <AdImage src="https://younuk.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf0a0656-3146-4e9b-8739-7bca3d0d2cb4%2F%25E1%2584%2584%25E1%2585%25B5%25E1%2586%25BC%25E1%2584%2589%25E1%2585%25B3%25E1%2584%2591%25E1%2585%25B3%25E1%2586%25AF%25E1%2584%2585%25E1%2585%25A9%25E1%2584%258B%25E1%2585%25AE_%25E1%2584%2585%25E1%2585%25A9%25E1%2584%2580%25E1%2585%25A9_%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2587%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2592%25E1%2585%25A7%25E1%2586%25BC.png?table=block&id=23d7e96e-0dbc-4ba3-9e41-c0f22a5ba926&spaceId=72b256b1-ae08-4e70-bb6c-f9c3cad5a793&width=2000&userId=&cache=v2" />
              </AdImageWrapper>
            </OneIssue>
          ),
        )}
      </IssueList>
    </IssueListWrapper>
  ) : (
    <Loading />
  )
}

const IssueListWrapper = styled.div`
  display: flex;
  margin: 0 3%;
  flex-direction: column;
  align-items: center;
`
const IssueList = styled.div`
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 800px;
`
const OneIssue = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 15px;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`
const IssueTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 0;
`
const IssueEtc = styled.div`
  font-size: 12px;

  & span {
    margin-right: 7px;
    padding-right: 7px;
    color: #777;
  }
`
const IssueWriter = styled.span``

const IssueDate = styled.span``

const IssueComments = styled.span``

const AdImageWrapper = styled.div`
  text-align: center;
`
const AdImage = styled.img`
  width: 100px;
  display: inline-block;
`
