# Angualr Intermediate Concepts Practice Exercise

1) Create a new module called feedback
       `ng g m feedback --routing`
2) Create a new component called feedback
       `ng g c feedback -m feedback`
3) In feedback-routing.module.ts, add a eager route
`{ path: '', component: FeedbackComponent }`
4) Add the floating button on the app.component.html
```html
<button class="mdc-fab material-icons feedback" aria-label="Feedback">
  <span class="mdc-fab__icon">
    feedback
  </span>
</button>
```
5) Float this button using CSS in app.component.scss
```css
.feedback {
  position: fixed;
  right: 18px;
  bottom: 18px;
}
```
6) Add the router link to this button of 'feedback' to this button, should look like this after adding;
```html
<button [routerLink]="['/feedback']" ...>
```
7) Add this html of textarea and button to send the feedback in feedback.component.html
```html
<div class="container">
  <div class="mdc-textfield mdc-textfield--textarea mdc-textfield--fullwidth">
    <textarea id="textarea-css-only"
      class="mdc-textfield__input"
      rows="8"
      cols="40"
      placeholder="Enter your feedback about the application"></textarea>
  </div>
  <button class="mdc-button mdc-button--raised">
    Send Feedback
  </button>
</div>
```
8) Get Slack Webhook API url, 
* Go to https://api.slack.com/incoming-webhooks and click on the link `incoming webhook integration`
* Choose a channel (choose your username), and click on `add incoming webhook integration`
* copy the webhook url

9) Create Slack Service, right click on the shared folder and click `Generate Service...` and enter slack, and add this method
```javascript
send(slackObject: object) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(environment.slackWebhook, JSON.stringify(slackObject), {
      headers: header
    });
  }
```
resolve all the errors, add the Slack Webhook API url that we got to both `environment.ts` and `environment.prod.ts`

10) Now lets go back to feedback component and let it submit the form
 * add [(ngModel)]="feedback" to the textarea element in feedback.component.html, and create the respective member variable for FeedbackComponent class 
 * Since we are using ngModel which is included in FormsModule, include this module in SharedModule
 * add click event to the `Send Feedback` button, `(click)="sendFeedback()"`
 * add respective method in the FeedbackComponent class
```javascript
sendFeedback() {
    this.slackService.send({
      text: this.feedback
    }).subscribe(() => this.sent = true, () => this.sent = true);
  }
```
where slackService is SlackService instance, and `sent` is a member variable which will tell us if the api completes
* Now in html use [ngIf]="sent" to show the `Feedback Sent!` message

Now lets focus on getting the repos for the github user on our search page.

11) Add a new Function to our existing GithubService, which is almost similar to our getUser method
```javascript
getRepos(username): Observable<any> {
    return this.http
      .get(
        `https://api.github.com/users/${username}/repos?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .catch(() => Observable.of({
        error: true,
      }));
  }
```

12) In our SearchComponent, lets use this method that we created, we know that we need to call this method once we successfully get the user info, so lets add switchMap to our getUser function and call the getRepos function and return and object which contains both userinfo and repos info
```javascript
this.githubService.getUser(value).switchMap(user =>
          this.githubService.getRepos(user.login).map(repos => ({
            ...user,
            repos
          }))
        )
```
and in the subscribe method, assign the repos array to a new repos class member variable.

13) Create a new repos component and pass the username and repos to it, use this template for this new component
```html
<h3>{{username}}'s Repositories</h3>
<section class="mdc-theme--dark">
    <ul class="mdc-list">
        <li *ngFor="let repo of repos" class="mdc-list-item">
            <i class="mdc-list-item__start-detail material-icons" aria-hidden="true">folder</i>
            {{repo.name}}</li>
      </ul>
</section>
```




