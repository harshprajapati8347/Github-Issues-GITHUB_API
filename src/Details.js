import { formatDistance } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Details() {
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data: issue,
  } = useQuery(["issue", params.id], issueFeatch);

  async function issueFeatch() {
    const response = await fetch(
          `https://api.github.com/repos/facebook/create-react-app/issues/${params.id}`
      );
      return await response.json();
  }
  return (
    <>
      {isLoading && <div>Loading ...</div>}
      {isSuccess && (
        <div className="comments-container">
          <h2>
            {issue.title}
            <span>{issue.number}</span>
          </h2>
          <div className="issue-details">
            <a href={issue.user.html_url}>{issue.user.login}</a> opened this
            issue{" "}
            {formatDistance(new Date(issue.created_at), new Date(), {
              addSuffix: true,
            })}
          </div>

          <div className="comment-container">
            <a href={issue.user.html_url}>
              <img
                src={issue.user.avatar_url}
                alt="avatar"
                className="avatar"
              />
            </a>
            <div className="comment">
              <div className="comment-heading">
                <a href={issue.user.html_url}>{issue.user.login}</a> commented{" "}
                {formatDistance(new Date(issue.created_at), new Date(), {
                  addSuffix: true,
                })}
              </div>

              <div className="comment-body markdown-body">
                <ReactMarkdown children={issue.body} />
              </div>
            </div>
          </div>

          <div className="border"></div>
        </div>
      )}
    </>
  );
}

export default Details;
