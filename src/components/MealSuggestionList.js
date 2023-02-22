import React from "react";

function MealSuggestionList(props) {
    return (
        <div>
            <article className="uk-comment uk-comment-primary uk-margin-medium-top" role="comment">
                <header className="uk-comment-header">
                    <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                        <div className="uk-width-auto">
                            <img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />
                        </div>
                        <div className="uk-wdith-expand">
                            <h4 className="uk-comment-title uk-margin-remove">Breakfast</h4>
                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                <li>9 hours ago</li>
                                <li><a className="uk-link-toggle" href="./"> <span className="uk-link-heading">Edit</span></a></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="uk-comment-body">
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </div>
            </article>
            <article className="uk-comment uk-comment-primary uk-margin-medium-top" role="comment">
                <header className="uk-comment-header">
                    <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                        <div className="uk-width-auto">
                            <img className="uk-border-circle" src="https://styles.redditmedia.com/t5_2sws5/styles/communityIcon_shz4ogqfbtw81.png" width="50" height="50" alt="" />
                        </div>
                        <div className="uk-wdith-expand">
                            <h4 className="uk-comment-title uk-margin-remove">Breakfast</h4>
                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                <li>9 hours ago</li>
                                <li><a className="uk-link-toggle" href="./"> <span className="uk-link-heading">Edit</span></a></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="uk-comment-body">
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </div>
            </article>
            <div className="uk-margin-medium">
                <button className="uk-button uk-button-primary uk-width-medium uk-align-center">Confirm</button>
            </div>
        </div>
    );
}

export default MealSuggestionList;