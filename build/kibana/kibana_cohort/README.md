# Cohort Analysis

This part was found [here](https://www.kdnuggets.com/2016/05/clevertap-use-cohort-analysis-improve-customer-retention.html)

Long-term success for app developers does not mean only getting someone to download their app, but also getting them to make repeat visits. To get to the must-have value proposition of your app product, you need to go beyond vanity metrics – like download counts and even daily active users (DAU) / monthly active users (MAU) – that only measure growth and retention superficially. You need to dig deeper into your app using a method –Cohort Analysis.

## What is Cohort Analysis

Cohort analysis is a subset of behavioral analytics that takes the data from a given eCommerce platform, web application, or online game and rather than looking at all users as one unit, it breaks them into related groups for analysis. These related groups, or cohorts, usually share common characteristics or experiences within a defined time-span.

Cohort analysis is a tool to measure user engagement over time. It helps to know whether user engagement is actually getting better over time or is only appearing to improve because of growth.

Cohort analysis proves to be valuable because it helps to separate growth metrics from engagement metrics as growth can easily mask engagement problems. In reality, the lack of activity of the old users is being hidden by the impressive growth numbers of new users, which results in concealing the lack of engagement from a small number of people.

Let’s understand using cohort analysis with an example – daily cohort of users who have launched an app first time and revisited the app in the next 10 days.

<img src="./screens/table1a2.png" align="middle">

From the above retention table – Triangular chart, we can infer the following

- 1358 users launched an app on Jan 26. Day 1 retention was 31.1%, day 7 retention was 12.9%, and day 9 retention was 11.3%. So on the 7th day after using the app, 1 in 8 users who launched an app on Jan 26 were still active users on the app.

- Out of all of the new users during this time range (13,487 users), 27% users are retained on day 1, 12.5% on day 7, and 12.1% on day 10.

Furthermore, two main benefits of reading the above cohort table, are:

- Product lifetime (as depicted vertically down in the table) – comparing different cohorts at the same stage in their life cycle – we can see what % of people in a cohort are coming back to app after 3 days and so on. The early lifetime months can be linked to the quality of your onboarding experience and the performance of customer success team, and

- User lifetime (as depicted horizontally to the right of the table) – seeing the long term relationship with people in any cohort – to ascertain how long people are coming back and how strong or how valuable that cohort is. This can be presumably linked to something like the quality of the product, operations, and customer support.

Whatever the evaluation key metrics you define for the business, cohort analysis lets you view how the metrics develop over the customer lifetime as well as over the product lifetime.

## How to Improve Your Retention Cohort

Cohort analysis involves looking at the groups of people, over time, and observing how their behavior changes. For instance, if we send out an email notification to 100 people, some may buy the product on day 1, less on day 2, even fewer on day 3, and so on. But, if we send another email to 100 people, after few weeks, they’ll be buying the product on their “day 0”while the first sent email might show its prevalent lag effect on the buying decision.

In order to track how users behave over time or how the same behavior differs for different cohorts, cohort analysis helps to compare these people by the way / time they were acquired or by the retention of those users over time.

But, how to break the group of users into cohorts for cohort analysis – can be done in two ways:

- `Acquisition Cohorts` : divide users by when they signed up first for your product. For your app users, you might break down your cohorts by the day, the week or the month they launched an app, and thereby track daily, weekly or monthly cohorts.
In this case, by measuring the retention of these cohorts, you can determine how long people continue to use your app from their start point.

- `Behavioral Cohorts` : divide users by the behaviors they have (or haven’t) taken in your app within a given time period. These could be any number of discrete actions that a user can perform – App Install, App Launch, App Uninstall, Transaction or Charged, or any combination of these actions / events.

In this case, a cohort can be a group of users who did certain actions within a specified timeframe – say, within first 3 days of app use. You can then monitor how long different cohorts stay active in your app after they perform certain actions.

Let’s see how you can use both acquisition and behavioral cohorts to determine exactly what your users are doing and when they’re doing it.

> Acquisition Cohorts – Finding Problem Moments in Your App

Revisiting the above daily cohort – which is an acquisition cohort.

<img src="./screens/table1b.png" align="middle">

One way to visualize this information is to chart out a retention curve, showing the retention of these cohorts over time. The chart makes incredibly easy to infer when users are leaving your product.

This retention curve immediately reflects an important insight – about 75% of the users stop using the app after the 1st day. After that initial large drop, a second brisk drop occurs after 5th day – to under 12%, before the curve starts to level off after 7th day, leaving about 11% of original users still active in the app at day 10.

The above retention curve indicates that users are not getting quickly to the core value of the app, resulting in drop-offs. Hence, it’s evident to improve the on-boarding experience to get the user to the core value as quickly as possible, thereby boosting the retention.

Thus, acquisition cohorts are great for identifying trends and the point when people are churning, but it’s hard to make actionable insights like – to understand why they are leaving – which requires the use of another type of cohorts, behavioral cohorts

> Behavioral Cohorts – Discover Which Behaviors Drive Retention

A simple example of behavioral cohort can be – all users who read reviews prior to purchasing a product. This can answer interesting questions, like,

Are the users who read reviews have a higher conversion rate than those users who don’t read reviews, or
Are the users more engaged – longer sessions, more time in app, fewer drop-offs
An app user, after an app install and / or launch, makes hundreds of decisions and exhibit countless little behaviors that lead towards their decision to stay or go. These behaviors could be anything, like, using core feature Y but not using core feature Z, engaging only with notifications of type X, and so on.

Let’s test user’s behavior by comparing retention between below cohorts:

<img src="./screens/behavioral-cohorts.png" align="middle">


Both user segments had the intention to transact on your app. But one user segment chose to proceed with the checkout, the other choose to abandon your app. What you can do to reduce the shopping cart abandonment?

Cohort analysis can get answers to the questions like:

- When is the best time to re-engage with your users? When is the best time for remarketing?

- What is the rate of acquisition of new users to maintain (if not increase) your app conversion rate?

From the above retention tables, you can conclude that majority of the users who had abandoned the shopping cart did not engage with the app again, not even 1 day after the acquisition date. So, you have less than 24 hours to re-target them with the new offer and increase the chances of getting revenue.

From this data, you can develop a systematic, quantitative approach to know how users can fall in love with your app – and then make it happen again and again. Also, you can make strategies to increase your retention after ascertaining what works and what doesn’t.

Conclusion

The power of cohort analysis lies in the fact that, it enables not only to view which customers leave and when they leave, but also to understand why the customers leave your app – so that you can fix it. That’s how one can identify how well the users are being retained and also determine the primary factors driving the growth, engagement and revenue for the app.

# Kibana Plugin - Cohort Analysis

This project is a simple tutorial for Kibana new comers trying to develop their own vizualisation plugin. The actual usecase of this plugin is to create a custom cohort visualization based on React and Elastic EUI.

As plugin architecture is being under heavy redesign in 7.x and documentation is rather obscure, I did my best to create something simple that works. The code is also basic, I am JS & React beginner.

This repository is for Kibana v7.8.x plugin New Platform (NP)

This plugin is adapted from the [elo7 plugin](https://github.com/elo7/cohort)

## Sample Screenshots

Few screen shots which makes it very easy to understand.

<img src="./screens/cohort_table.png" align="middle">
This is an example of Cohort analysis using Elastic EUI Table



<img src="./screens/cohort_chart.png" align="middle">
This is an example of Cohort analysis using Elastic EUI Charts

<img src="./screens/cohort_dashboard.png" align="middle">
This is an example of Cohort analysis Visualization inside a dashboard.


## Usage

 The **total** metric is the value that determine y-axis. Can be either a count or a sum. It also possible to use the percentual as y value just marking the option `Show percetual values`.

<img src="./screens/metric.png" align="middle">


The **cohort date** bucket is the date used to draw the chart lines. Each bucket is a line in this chart. It should be a date histogram.

<img src="./screens/date.png" align="middle">

The **cohort period** bucket is the "cohort" itself that determine the x-axis. It should be a numeric histogram.

<img src="./screens/period.png" align="middle">

## Installing the plugin

The plugin can then be installed like this

```
kibana-plugin install https://github.com/synapticielfactory/kibana_cohort/releases/download/v7.8.0/kibana_cohort_7.8.0_0.0.1.zip
```

## Install on Windows

````
kibana-plugin.bat install https://github.com/synapticielfactory/kibana_cohort/releases/download/v7.8.0/kibana_cohort_7.8.0_0.0.1.zip
Attempting to transfer from https://github.com/synapticielfactory/kibana_cohort/releases/download/v7.8.0/kibana_cohort_7.8.0_0.0.1.zip
Transferring 815445 bytes....................
Transfer complete
Retrieving metadata from plugin archive
Extracting plugin archive
Extraction complete
Plugin installation complete
````

## Remove on Windows

````
kibana-plugin.bat list
kibana_cohort@0.0.1

kibana-plugin.bat remove kibana_cohort
Removing kibana_cohort...
Plugin removal complete

````