# Investments Dashboard
This is a dashboard that displays the investments done by investors. The idea is to showcase the total amount invested, number of investments and analyse the investment rounds in which the investments were made and to which entities.

![Interface screenshot](./sketches%20and%20mockups/finalInterface.png)

The interface is composed of four main areas: (1) a header, where the investor to be evaluated is selected; (2) a demographic area, where the name and headquartes (if the investor is a company), as well as the total amount invested and number of investments; (3) two list areas with the market and solution segments; (4) a bar chart where each bar is an invesment round (bars are organized by timestamp) and their height is the amount invested; (5) a bubble chart with the invested entities represented as circles sized according to the amount invested in each of the entities.

While it was not developed due to time constrains, Figma mockups also showcase the existance of a dashboard about the invested entities (how much money was invested in them, how many investments, how those investments were distributed through time, and who invested).

## Dataset
There were some slight changes performed to the original dataset.
First, duplicate investor "name" fields were considered the same investor and their investments were merged. There were two names in this situation. This was made to avoid confusing users with multiple equal investor names.
Additionally, only investors with complete "investments" information were considered. Investors with investments without "roundSizeUsd" (amount) were removed from the dataset. This was done since it was considered that investments without amount information did not have enough insights to be showcased in the dashboard.
Some other inconsistencies were also detected in the dataset. Namely, there are some type person investors with the hqCountry field. Nothing was done regarding this issue, the field is simply ignored in the interface when considering a person investor. There were also some cases where the market segments and/or solution segments list were empty or null. In this case, the interface indicates that the corresponding list is empty.

Operations performed to the dataset and identification of repeated elements were done using Python (check DatasetAnalysis.ipynb).

## Codebase
The codebase where the interface can be run is present in the folder /codebase.