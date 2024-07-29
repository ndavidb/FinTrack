namespace api.Dto.Stock;

public abstract class FmpStock
{
    public string symbol { get; set; } = null!;
    public double price { get; set; }
    public double beta { get; set; }
    public int volAvg { get; set; }
    public long mktCap { get; set; }
    public double lastDiv { get; set; }
    public string range { get; set; } = null!;
    public double changes { get; set; }
    public string companyName { get; set; } = null!;
    public string currency { get; set; } = null!;
    public string cik { get; set; } = null!;
    public string isin { get; set; } = null!;
    public string cusip { get; set; } = null!;
    public string exchange { get; set; } = null!;
    public string exchangeShortName { get; set; } = null!;
    public string industry { get; set; } = null!;
    public string website { get; set; } = null!;
    public string description { get; set; } = null!;
    public string ceo { get; set; } = null!;
    public string sector { get; set; } = null!;
    public string country { get; set; } = null!;
    public string fullTimeEmployees { get; set; } = null!;
    public string phone { get; set; } = null!;
    public string address { get; set; } = null!;
    public string city { get; set; } = null!;
    public string state { get; set; } = null!;
    public string zip { get; set; } = null!;
    public double dcfDiff { get; set; }
    public double dcf { get; set; }
    public string image { get; set; } = null!;
    public string ipoDate { get; set; } = null!;
    public bool defaultImage { get; set; }
    public bool isEtf { get; set; }
    public bool isActivelyTrading { get; set; }
    public bool isAdr { get; set; }
    public bool isFund { get; set; }
}