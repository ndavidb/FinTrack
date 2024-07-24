# Details

Date : 2024-07-16 19:07:03

Directory /Users/nilson/Desktop/FinTrack

Total : 161 files,  23893 codes, 108 comments, 1743 blanks, all 25744 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.idea/.idea.FinTrack/.idea/dataSources.xml](/.idea/.idea.FinTrack/.idea/dataSources.xml) | XML | 12 | 0 | 0 | 12 |
| [.idea/.idea.FinTrack/.idea/encodings.xml](/.idea/.idea.FinTrack/.idea/encodings.xml) | XML | 4 | 0 | 0 | 4 |
| [.idea/.idea.FinTrack/.idea/indexLayout.xml](/.idea/.idea.FinTrack/.idea/indexLayout.xml) | XML | 13 | 0 | 0 | 13 |
| [.idea/.idea.FinTrack/.idea/vcs.xml](/.idea/.idea.FinTrack/.idea/vcs.xml) | XML | 6 | 0 | 0 | 6 |
| [README.md](/README.md) | Markdown | 2 | 0 | 1 | 3 |
| [api/Controllers/AccountsController.cs](/api/Controllers/AccountsController.cs) | C# | 84 | 0 | 14 | 98 |
| [api/Controllers/CommentsController.cs](/api/Controllers/CommentsController.cs) | C# | 90 | 0 | 19 | 109 |
| [api/Controllers/PortfoliosController.cs](/api/Controllers/PortfoliosController.cs) | C# | 98 | 0 | 22 | 120 |
| [api/Controllers/StocksController.cs](/api/Controllers/StocksController.cs) | C# | 60 | 0 | 22 | 82 |
| [api/Data/ApplicationDbContext.cs](/api/Data/ApplicationDbContext.cs) | C# | 44 | 0 | 10 | 54 |
| [api/Dto/Account/LoginDto.cs](/api/Dto/Account/LoginDto.cs) | C# | 9 | 0 | 2 | 11 |
| [api/Dto/Account/NewUserDto.cs](/api/Dto/Account/NewUserDto.cs) | C# | 7 | 0 | 1 | 8 |
| [api/Dto/Account/RegisterDto.cs](/api/Dto/Account/RegisterDto.cs) | C# | 12 | 0 | 2 | 14 |
| [api/Dto/Comment/CommentDto.cs](/api/Dto/Comment/CommentDto.cs) | C# | 10 | 0 | 1 | 11 |
| [api/Dto/Comment/CreateCommentDtoRequest.cs](/api/Dto/Comment/CreateCommentDtoRequest.cs) | C# | 13 | 0 | 2 | 15 |
| [api/Dto/Comment/UpdateCommentRequestDto.cs](/api/Dto/Comment/UpdateCommentRequestDto.cs) | C# | 13 | 0 | 2 | 15 |
| [api/Dto/Stock/CreateStockRequestDto.cs](/api/Dto/Stock/CreateStockRequestDto.cs) | C# | 20 | 0 | 2 | 22 |
| [api/Dto/Stock/FmpStock.cs](/api/Dto/Stock/FmpStock.cs) | C# | 40 | 0 | 1 | 41 |
| [api/Dto/Stock/StockDto.cs](/api/Dto/Stock/StockDto.cs) | C# | 11 | 0 | 2 | 13 |
| [api/Dto/Stock/StockPerformanceDto.cs](/api/Dto/Stock/StockPerformanceDto.cs) | C# | 11 | 0 | 1 | 12 |
| [api/Dto/Stock/StockPortfolioDto.cs](/api/Dto/Stock/StockPortfolioDto.cs) | C# | 11 | 0 | 1 | 12 |
| [api/Dto/Stock/UpdateStockRequestDto.cs](/api/Dto/Stock/UpdateStockRequestDto.cs) | C# | 20 | 0 | 2 | 22 |
| [api/Extensions/ClaimsExtensions.cs](/api/Extensions/ClaimsExtensions.cs) | C# | 9 | 0 | 2 | 11 |
| [api/Helpers/QueryObject.cs](/api/Helpers/QueryObject.cs) | C# | 9 | 0 | 2 | 11 |
| [api/Helpers/UrlManagement.cs](/api/Helpers/UrlManagement.cs) | C# | 13 | 0 | 4 | 17 |
| [api/Interfaces/ICommentService.cs](/api/Interfaces/ICommentService.cs) | C# | 11 | 0 | 2 | 13 |
| [api/Interfaces/IFmpService.cs](/api/Interfaces/IFmpService.cs) | C# | 7 | 0 | 2 | 9 |
| [api/Interfaces/IPortfolioService.cs](/api/Interfaces/IPortfolioService.cs) | C# | 12 | 0 | 2 | 14 |
| [api/Interfaces/IStockPriceService.cs](/api/Interfaces/IStockPriceService.cs) | C# | 5 | 0 | 1 | 6 |
| [api/Interfaces/IStockService.cs](/api/Interfaces/IStockService.cs) | C# | 16 | 0 | 2 | 18 |
| [api/Interfaces/ITokenService.cs](/api/Interfaces/ITokenService.cs) | C# | 6 | 0 | 2 | 8 |
| [api/Mappers/CommentMapper.cs](/api/Mappers/CommentMapper.cs) | C# | 36 | 0 | 3 | 39 |
| [api/Mappers/StockMappers.cs](/api/Mappers/StockMappers.cs) | C# | 51 | 0 | 5 | 56 |
| [api/Migrations/20240618034412_UpToDateofDB.Designer.cs](/api/Migrations/20240618034412_UpToDateofDB.Designer.cs) | C# | 311 | 2 | 108 | 421 |
| [api/Migrations/20240618034412_UpToDateofDB.cs](/api/Migrations/20240618034412_UpToDateofDB.cs) | C# | 291 | 3 | 34 | 328 |
| [api/Migrations/20240701040205_PortfolioPriceAndDateColumnsandStockNewWebsiteColumn.Designer.cs](/api/Migrations/20240701040205_PortfolioPriceAndDateColumnsandStockNewWebsiteColumn.Designer.cs) | C# | 318 | 2 | 111 | 431 |
| [api/Migrations/20240701040205_PortfolioPriceAndDateColumnsandStockNewWebsiteColumn.cs](/api/Migrations/20240701040205_PortfolioPriceAndDateColumnsandStockNewWebsiteColumn.cs) | C# | 75 | 3 | 15 | 93 |
| [api/Migrations/20240701055245_ModifyPortfolioTable_ModifyStockTableRemovingPurchaseAndLastDiv.Designer.cs](/api/Migrations/20240701055245_ModifyPortfolioTable_ModifyStockTableRemovingPurchaseAndLastDiv.Designer.cs) | C# | 316 | 2 | 110 | 428 |
| [api/Migrations/20240701055245_ModifyPortfolioTable_ModifyStockTableRemovingPurchaseAndLastDiv.cs](/api/Migrations/20240701055245_ModifyPortfolioTable_ModifyStockTableRemovingPurchaseAndLastDiv.cs) | C# | 74 | 3 | 15 | 92 |
| [api/Migrations/20240704032359_AddSStockPriceTable.Designer.cs](/api/Migrations/20240704032359_AddSStockPriceTable.Designer.cs) | C# | 316 | 2 | 110 | 428 |
| [api/Migrations/20240704032359_AddSStockPriceTable.cs](/api/Migrations/20240704032359_AddSStockPriceTable.cs) | C# | 47 | 3 | 9 | 59 |
| [api/Migrations/20240704032604_AddSStockPriceTableUpdate.Designer.cs](/api/Migrations/20240704032604_AddSStockPriceTableUpdate.Designer.cs) | C# | 344 | 2 | 121 | 467 |
| [api/Migrations/20240704032604_AddSStockPriceTableUpdate.cs](/api/Migrations/20240704032604_AddSStockPriceTableUpdate.cs) | C# | 76 | 3 | 12 | 91 |
| [api/Migrations/20240706041254_ResetAndRessedDatabase.Designer.cs](/api/Migrations/20240706041254_ResetAndRessedDatabase.Designer.cs) | C# | 344 | 2 | 121 | 467 |
| [api/Migrations/20240706041254_ResetAndRessedDatabase.cs](/api/Migrations/20240706041254_ResetAndRessedDatabase.cs) | C# | 53 | 3 | 10 | 66 |
| [api/Migrations/20240707034205_PortfolioModelCheck.Designer.cs](/api/Migrations/20240707034205_PortfolioModelCheck.Designer.cs) | C# | 344 | 2 | 121 | 467 |
| [api/Migrations/20240707034205_PortfolioModelCheck.cs](/api/Migrations/20240707034205_PortfolioModelCheck.cs) | C# | 47 | 3 | 9 | 59 |
| [api/Migrations/ApplicationDbContextModelSnapshot.cs](/api/Migrations/ApplicationDbContextModelSnapshot.cs) | C# | 342 | 1 | 121 | 464 |
| [api/Models/AppUser.cs](/api/Models/AppUser.cs) | C# | 6 | 0 | 2 | 8 |
| [api/Models/Comment.cs](/api/Models/Comment.cs) | C# | 12 | 0 | 4 | 16 |
| [api/Models/Portfolio.cs](/api/Models/Portfolio.cs) | C# | 11 | 0 | 1 | 12 |
| [api/Models/Stock.cs](/api/Models/Stock.cs) | C# | 16 | 0 | 3 | 19 |
| [api/Models/StockPrice.cs](/api/Models/StockPrice.cs) | C# | 10 | 0 | 2 | 12 |
| [api/Program.cs](/api/Program.cs) | C# | 138 | 2 | 22 | 162 |
| [api/Properties/launchSettings.json](/api/Properties/launchSettings.json) | JSON | 41 | 0 | 1 | 42 |
| [api/Services/CommentService.cs](/api/Services/CommentService.cs) | C# | 58 | 0 | 16 | 74 |
| [api/Services/FmpService.cs](/api/Services/FmpService.cs) | C# | 55 | 0 | 8 | 63 |
| [api/Services/PortfolioService.cs](/api/Services/PortfolioService.cs) | C# | 88 | 0 | 14 | 102 |
| [api/Services/StockPriceService.cs](/api/Services/StockPriceService.cs) | C# | 51 | 0 | 4 | 55 |
| [api/Services/StockService.cs](/api/Services/StockService.cs) | C# | 86 | 0 | 25 | 111 |
| [api/Services/TokenService.cs](/api/Services/TokenService.cs) | C# | 38 | 0 | 8 | 46 |
| [api/api.csproj](/api/api.csproj) | XML | 29 | 0 | 3 | 32 |
| [api/appsettings.Development.json](/api/appsettings.Development.json) | JSON | 13 | 0 | 1 | 14 |
| [api/appsettings.json](/api/appsettings.json) | JSON | 19 | 0 | 1 | 20 |
| [api/bin/Debug/net8.0/api.deps.json](/api/bin/Debug/net8.0/api.deps.json) | JSON | 1,328 | 0 | 0 | 1,328 |
| [api/bin/Debug/net8.0/api.runtimeconfig.json](/api/bin/Debug/net8.0/api.runtimeconfig.json) | JSON | 20 | 0 | 0 | 20 |
| [api/bin/Debug/net8.0/api.staticwebassets.runtime.json](/api/bin/Debug/net8.0/api.staticwebassets.runtime.json) | JSON | 1 | 0 | 0 | 1 |
| [api/bin/Debug/net8.0/appsettings.Development.json](/api/bin/Debug/net8.0/appsettings.Development.json) | JSON | 13 | 0 | 1 | 14 |
| [api/bin/Debug/net8.0/appsettings.json](/api/bin/Debug/net8.0/appsettings.json) | JSON | 19 | 0 | 1 | 20 |
| [api/obj/Debug/net8.0/.NETCoreApp,Version=v8.0.AssemblyAttributes.cs](/api/obj/Debug/net8.0/.NETCoreApp,Version=v8.0.AssemblyAttributes.cs) | C# | 3 | 1 | 1 | 5 |
| [api/obj/Debug/net8.0/api.AssemblyInfo.cs](/api/obj/Debug/net8.0/api.AssemblyInfo.cs) | C# | 10 | 9 | 5 | 24 |
| [api/obj/Debug/net8.0/api.GeneratedMSBuildEditorConfig.editorconfig](/api/obj/Debug/net8.0/api.GeneratedMSBuildEditorConfig.editorconfig) | Properties | 19 | 0 | 1 | 20 |
| [api/obj/Debug/net8.0/api.GlobalUsings.g.cs](/api/obj/Debug/net8.0/api.GlobalUsings.g.cs) | C# | 16 | 1 | 1 | 18 |
| [api/obj/Debug/net8.0/api.MvcApplicationPartsAssemblyInfo.cs](/api/obj/Debug/net8.0/api.MvcApplicationPartsAssemblyInfo.cs) | C# | 5 | 9 | 5 | 19 |
| [api/obj/Debug/net8.0/api.sourcelink.json](/api/obj/Debug/net8.0/api.sourcelink.json) | JSON | 1 | 0 | 0 | 1 |
| [api/obj/Debug/net8.0/staticwebassets.build.json](/api/obj/Debug/net8.0/staticwebassets.build.json) | JSON | 1,152 | 0 | 0 | 1,152 |
| [api/obj/Debug/net8.0/staticwebassets.development.json](/api/obj/Debug/net8.0/staticwebassets.development.json) | JSON | 1 | 0 | 0 | 1 |
| [api/obj/Debug/net8.0/staticwebassets/msbuild.build.api.props](/api/obj/Debug/net8.0/staticwebassets/msbuild.build.api.props) | XML | 3 | 0 | 0 | 3 |
| [api/obj/Debug/net8.0/staticwebassets/msbuild.buildMultiTargeting.api.props](/api/obj/Debug/net8.0/staticwebassets/msbuild.buildMultiTargeting.api.props) | XML | 3 | 0 | 0 | 3 |
| [api/obj/Debug/net8.0/staticwebassets/msbuild.buildTransitive.api.props](/api/obj/Debug/net8.0/staticwebassets/msbuild.buildTransitive.api.props) | XML | 3 | 0 | 0 | 3 |
| [api/obj/api.csproj.EntityFrameworkCore.targets](/api/obj/api.csproj.EntityFrameworkCore.targets) | XML | 28 | 0 | 1 | 29 |
| [api/obj/api.csproj.nuget.dgspec.json](/api/obj/api.csproj.nuget.dgspec.json) | JSON | 114 | 0 | 0 | 114 |
| [api/obj/api.csproj.nuget.g.props](/api/obj/api.csproj.nuget.g.props) | XML | 27 | 0 | 0 | 27 |
| [api/obj/api.csproj.nuget.g.targets](/api/obj/api.csproj.nuget.g.targets) | XML | 10 | 0 | 0 | 10 |
| [api/obj/project.assets.json](/api/obj/project.assets.json) | JSON | 3,940 | 0 | 0 | 3,940 |
| [api/obj/project.packagespec.json](/api/obj/project.packagespec.json) | JSON | 1 | 0 | 0 | 1 |
| [client/.env](/client/.env) | Properties | 1 | 0 | 0 | 1 |
| [client/.eslintrc.json](/client/.eslintrc.json) | JSON with Comments | 3 | 0 | 1 | 4 |
| [client/README.md](/client/README.md) | Markdown | 23 | 0 | 14 | 37 |
| [client/actions/portfolioActions.ts](/client/actions/portfolioActions.ts) | TypeScript | 57 | 0 | 11 | 68 |
| [client/app/company/[ticker]/balancesheet/page.tsx](/client/app/company/%5Bticker%5D/balancesheet/page.tsx) | TypeScript JSX | 71 | 0 | 5 | 76 |
| [client/app/company/[ticker]/cashflow/page.tsx](/client/app/company/%5Bticker%5D/cashflow/page.tsx) | TypeScript JSX | 52 | 0 | 4 | 56 |
| [client/app/company/[ticker]/incomestatement/page.tsx](/client/app/company/%5Bticker%5D/incomestatement/page.tsx) | TypeScript JSX | 71 | 0 | 4 | 75 |
| [client/app/company/[ticker]/layout.tsx](/client/app/company/%5Bticker%5D/layout.tsx) | TypeScript JSX | 22 | 0 | 3 | 25 |
| [client/app/company/[ticker]/profile/page.tsx](/client/app/company/%5Bticker%5D/profile/page.tsx) | TypeScript JSX | 81 | 0 | 7 | 88 |
| [client/app/home/layout.tsx](/client/app/home/layout.tsx) | TypeScript JSX | 19 | 0 | 3 | 22 |
| [client/app/home/page.tsx](/client/app/home/page.tsx) | TypeScript JSX | 14 | 0 | 4 | 18 |
| [client/app/layout.tsx](/client/app/layout.tsx) | TypeScript JSX | 30 | 0 | 3 | 33 |
| [client/app/login/layout.tsx](/client/app/login/layout.tsx) | TypeScript JSX | 11 | 0 | 2 | 13 |
| [client/app/login/page.tsx](/client/app/login/page.tsx) | TypeScript JSX | 128 | 0 | 7 | 135 |
| [client/app/page.tsx](/client/app/page.tsx) | TypeScript JSX | 21 | 0 | 2 | 23 |
| [client/app/portfolio/layout.tsx](/client/app/portfolio/layout.tsx) | TypeScript JSX | 15 | 0 | 2 | 17 |
| [client/app/portfolio/page.tsx](/client/app/portfolio/page.tsx) | TypeScript JSX | 20 | 0 | 3 | 23 |
| [client/app/register/page.tsx](/client/app/register/page.tsx) | TypeScript JSX | 109 | 0 | 6 | 115 |
| [client/components.json](/client/components.json) | JSON | 17 | 0 | 0 | 17 |
| [client/components/Brand/Brand.tsx](/client/components/Brand/Brand.tsx) | TypeScript JSX | 12 | 0 | 1 | 13 |
| [client/components/CardDashboard/CardDashboard.tsx](/client/components/CardDashboard/CardDashboard.tsx) | TypeScript JSX | 40 | 0 | 7 | 47 |
| [client/components/FAQs/FAQs.tsx](/client/components/FAQs/FAQs.tsx) | TypeScript JSX | 59 | 0 | 2 | 61 |
| [client/components/Footer/Footer.tsx](/client/components/Footer/Footer.tsx) | TypeScript JSX | 53 | 0 | 3 | 56 |
| [client/components/Hero/Hero.tsx](/client/components/Hero/Hero.tsx) | TypeScript JSX | 30 | 0 | 1 | 31 |
| [client/components/Portfolio/PortfolioStockCard.tsx](/client/components/Portfolio/PortfolioStockCard.tsx) | TypeScript JSX | 40 | 0 | 3 | 43 |
| [client/components/Portfolio/PortfolioStocksTable.tsx](/client/components/Portfolio/PortfolioStocksTable.tsx) | TypeScript JSX | 93 | 0 | 6 | 99 |
| [client/components/Portfolio/PortfolioStocksWrapper.tsx](/client/components/Portfolio/PortfolioStocksWrapper.tsx) | TypeScript JSX | 50 | 0 | 10 | 60 |
| [client/components/Portfolio/StockListSimple.tsx](/client/components/Portfolio/StockListSimple.tsx) | TypeScript JSX | 54 | 0 | 3 | 57 |
| [client/components/Portfolio/StockPriceChart.tsx](/client/components/Portfolio/StockPriceChart.tsx) | TypeScript JSX | 78 | 0 | 10 | 88 |
| [client/components/Pricing/PricingSection.tsx](/client/components/Pricing/PricingSection.tsx) | TypeScript JSX | 132 | 0 | 4 | 136 |
| [client/components/Search/SearchCard.tsx](/client/components/Search/SearchCard.tsx) | TypeScript JSX | 49 | 0 | 5 | 54 |
| [client/components/Search/SearchResultList.tsx](/client/components/Search/SearchResultList.tsx) | TypeScript JSX | 21 | 0 | 4 | 25 |
| [client/components/Search/SearchStocks.tsx](/client/components/Search/SearchStocks.tsx) | TypeScript JSX | 27 | 0 | 3 | 30 |
| [client/components/Search/SearchWrapper.tsx](/client/components/Search/SearchWrapper.tsx) | TypeScript JSX | 30 | 0 | 5 | 35 |
| [client/components/Search/Searchbar.tsx](/client/components/Search/Searchbar.tsx) | TypeScript JSX | 30 | 0 | 4 | 34 |
| [client/components/Sidebar/Sidebar.tsx](/client/components/Sidebar/Sidebar.tsx) | TypeScript JSX | 82 | 0 | 6 | 88 |
| [client/components/Sidebar/SidebarLinks.tsx](/client/components/Sidebar/SidebarLinks.tsx) | TypeScript JSX | 53 | 0 | 1 | 54 |
| [client/components/StatementTable/TestData.tsx](/client/components/StatementTable/TestData.tsx) | TypeScript JSX | 1,592 | 0 | 1 | 1,593 |
| [client/components/StatementTable/statementTable.tsx](/client/components/StatementTable/statementTable.tsx) | TypeScript JSX | 45 | 0 | 5 | 50 |
| [client/components/ToastProvider.tsx](/client/components/ToastProvider.tsx) | TypeScript JSX | 15 | 0 | 1 | 16 |
| [client/components/UserHomePortfolio/HomePortfolioReview.tsx](/client/components/UserHomePortfolio/HomePortfolioReview.tsx) | TypeScript JSX | 36 | 0 | 3 | 39 |
| [client/components/UserNavbar/UserNavbar.tsx](/client/components/UserNavbar/UserNavbar.tsx) | TypeScript JSX | 26 | 0 | 5 | 31 |
| [client/components/navbar/NavHeader.tsx](/client/components/navbar/NavHeader.tsx) | TypeScript JSX | 34 | 0 | 5 | 39 |
| [client/components/navbar/Navbar.tsx](/client/components/navbar/Navbar.tsx) | TypeScript JSX | 64 | 0 | 9 | 73 |
| [client/components/ui/avatar.tsx](/client/components/ui/avatar.tsx) | TypeScript JSX | 44 | 0 | 7 | 51 |
| [client/components/ui/badge.tsx](/client/components/ui/badge.tsx) | TypeScript JSX | 31 | 0 | 6 | 37 |
| [client/components/ui/button.tsx](/client/components/ui/button.tsx) | TypeScript JSX | 51 | 0 | 6 | 57 |
| [client/components/ui/card.tsx](/client/components/ui/card.tsx) | TypeScript JSX | 71 | 0 | 9 | 80 |
| [client/components/ui/carousel.tsx](/client/components/ui/carousel.tsx) | TypeScript JSX | 232 | 0 | 31 | 263 |
| [client/components/ui/chart.tsx](/client/components/ui/chart.tsx) | TypeScript JSX | 327 | 2 | 37 | 366 |
| [client/components/ui/dropdown-menu.tsx](/client/components/ui/dropdown-menu.tsx) | TypeScript JSX | 182 | 0 | 19 | 201 |
| [client/components/ui/icons/icons.tsx](/client/components/ui/icons/icons.tsx) | TypeScript JSX | 0 | 0 | 2 | 2 |
| [client/components/ui/input.tsx](/client/components/ui/input.tsx) | TypeScript JSX | 21 | 0 | 5 | 26 |
| [client/components/ui/label.tsx](/client/components/ui/label.tsx) | TypeScript JSX | 21 | 0 | 6 | 27 |
| [client/components/ui/pagination.tsx](/client/components/ui/pagination.tsx) | TypeScript JSX | 107 | 0 | 11 | 118 |
| [client/components/ui/ratioList.tsx](/client/components/ui/ratioList.tsx) | TypeScript JSX | 28 | 0 | 3 | 31 |
| [client/components/ui/separator.tsx](/client/components/ui/separator.tsx) | TypeScript JSX | 27 | 0 | 5 | 32 |
| [client/components/ui/sheet.tsx](/client/components/ui/sheet.tsx) | TypeScript JSX | 125 | 0 | 16 | 141 |
| [client/components/ui/table.tsx](/client/components/ui/table.tsx) | TypeScript JSX | 107 | 0 | 11 | 118 |
| [client/lib/auth.ts](/client/lib/auth.ts) | TypeScript | 22 | 0 | 7 | 29 |
| [client/lib/data.ts](/client/lib/data.ts) | TypeScript | 146 | 23 | 34 | 203 |
| [client/lib/definitions.ts](/client/lib/definitions.ts) | TypeScript | 351 | 0 | 14 | 365 |
| [client/lib/utils.ts](/client/lib/utils.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [client/middleware.ts](/client/middleware.ts) | TypeScript | 21 | 0 | 11 | 32 |
| [client/models/User.ts](/client/models/User.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [client/next.config.mjs](/client/next.config.mjs) | JavaScript | 14 | 1 | 2 | 17 |
| [client/package-lock.json](/client/package-lock.json) | JSON | 6,852 | 0 | 1 | 6,853 |
| [client/package.json](/client/package.json) | JSON | 46 | 0 | 1 | 47 |
| [client/postcss.config.mjs](/client/postcss.config.mjs) | JavaScript | 6 | 1 | 2 | 9 |
| [client/public/FinTrackLogo.svg](/client/public/FinTrackLogo.svg) | XML | 1 | 0 | 0 | 1 |
| [client/public/placeholder.svg](/client/public/placeholder.svg) | XML | 1 | 0 | 0 | 1 |
| [client/styles/globals.css](/client/styles/globals.css) | CSS | 19 | 4 | 5 | 28 |
| [client/tailwind.config.ts](/client/tailwind.config.ts) | TypeScript | 38 | 0 | 2 | 40 |
| [client/tsconfig.json](/client/tsconfig.json) | JSON with Comments | 26 | 0 | 1 | 27 |
| [qodana.yaml](/qodana.yaml) | YAML | 4 | 19 | 7 | 30 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)