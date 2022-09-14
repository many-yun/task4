import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import ReactMarkdown from 'react-markdown'
import Loading from '../../components/Loading'

export default function IssueDetail() {
  const { state } = useLocation()
  const [issueData, setIssueData] = useState({})
  const [loading, setLoading] = useState(true)

  const getIssueDetailApi = async page => {
    setLoading(true)
    return await axios
      .get(`${process.env.REACT_APP_GITHUB_URL}/${state}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      })
      .then(res => {
        setIssueData(res.data)
        setLoading(false)
      })
  }
  useEffect(() => {
    getIssueDetailApi()
  }, [])

  return !loading ? (
    issueData && (
      <IssueDetailWrapper>
        <IssueInfoWrapper>
          <IssueTopWrapper>
            <UserImageWrapper>
              <UserImage src={issueData.user?.avatar_url} />
            </UserImageWrapper>
            <IssueInfoText>
              <IssueTitle>
                <IssueNumber>#{issueData.number}</IssueNumber>
                {issueData.title}
              </IssueTitle>
              <IssueDataEtc>
                <IssueWriter>작성자 : {issueData.user?.login}</IssueWriter>
                <IssueDate>작성일 : {issueData.updated_at?.substr(0, 10)}</IssueDate>
                <IssueComments>코멘트 : {issueData.comments}</IssueComments>
              </IssueDataEtc>
            </IssueInfoText>
          </IssueTopWrapper>
          <IssueBodyWrapper>
            <ReactMarkdown>{issueData.body}</ReactMarkdown>
          </IssueBodyWrapper>
        </IssueInfoWrapper>
      </IssueDetailWrapper>
    )
  ) : (
    <Loading />
  )
}

const IssueDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 550px) {
    display: block;
  }
`
const IssueInfoWrapper = styled.div`
  max-width: 800px;
`
const IssueTopWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;

  @media screen and (max-width: 550px) {
    padding: 0 5% 20px 5%;
  }
`
const UserImageWrapper = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 100%;
  vertical-align: middle;
`
const UserImage = styled.img`
  width: 100%;
  height: 100%;
`
const IssueInfoText = styled.div`
  display: inline-block;
  width: calc(100% - 100px);
  vertical-align: middle;
  padding-left: 30px;

  @media screen and (max-width: 550px) {
    display: block;
    padding-left: 0;
    width: 100%;
    margin-top: 10px;
  }
`
const IssueTitle = styled.div`
  font-weight: bold;
  font-size: 23px;
  line-height: 28px;
  margin-bottom: 15px;
`
const IssueNumber = styled.div`
  margin-right: 10px;
  font-size: 16px;
  color: #aaa;
`

const IssueDataEtc = styled.div`
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

const IssueBodyWrapper = styled.div`
  border-top: 5px solid #eee;
  padding: 20px;

  @media screen and (max-width: 550px) {
    padding: 10px 5%;
  }
`
