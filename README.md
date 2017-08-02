# Ping An Nutrition Doctor - Mobile Client

During the Microsoft One Week Hackathon, we [Microsoft] collaborated with Ping An to build Nutrition Doctor. Nutrition Doctor is an application that allows users to take a photo of a food item whereupon the app will identify the food item and present the user with nutritional information such as calories, fat, etc. 

## Architecture

![architecture](https://raw.githubusercontent.com/CatalystCode/NutritionDoctorApi/master/docs/architecture.png)

----

![call graph](https://raw.githubusercontent.com/CatalystCode/NutritionDoctorApi/master/docs/call_graph.png)

Each component is separated into its own Git repository:

* [Mobile Client](https://github.com/CatalystCode/NutritionDoctor)
* [Web Api](https://github.com/CatalystCode/NutritionDoctorApi) 
* [Functions](https://github.com/CatalystCode/NutritionDoctorFunctions)
* [Image Classifier](https://github.com/CatalystCode/NutritionDoctorImageClassifier)

## Getting Started

The Mobile Client is a react-native application that communicates with a REST API to persist and read user information.

1. [Install Yarn](https://yarnpkg.com/en/docs/install)
2. `npm install -g react-native-cli`
3. `git clone git@github.com:CatalystCode/NutritionDoctor.git`
4. `cd NutritionDoctor`
5. `npm install`
6. `react-native run-ios`
