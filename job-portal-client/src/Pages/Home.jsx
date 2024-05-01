import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // handle input changes
  const filteredItems = jobs
  // console.log(filteredItems);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  // filter jobs by title

  //       ----------Radio filtering ---------

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  //   -----button-based filtering -----
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // filtering Input Items
    if (query) {
      filteredJobs = filteredItems;
    }

    // category filtering

    // if(selected){
    //   filteredJobs=filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,
    //   employementType,postingDate})=>(
    //     jobLocation.toLowerCase() === selected.toLowerCase()  ||
    //     parseInt(maxPrice) <= parseInt(selected) ||
    //     salaryType.toLowerCase() === selected.toLowerCase()||
    //     experienceLevel.toLowerCase()===selected.toLowerCase()||
    //     (employementType && employementType.toLowerCase() === selected.toLowerCase())
    //   ));
    // }

    if (selected === "AllLocation") {
      filteredJobs = filteredJobs.filter((item) => true);
    } else if (
      selected == "london" ||
      selected === "boston" ||
      selected === "madrid" ||
      selected === "seattle" ||
      selected === "Yearly" ||
      selected === "Monthly" ||
      selected === "80" ||
      selected === "30" ||
      selected === "50" ||
      selected === "100" ||
      selected === "internship" ||
      selected === "work remotely" ||
      selected === "temporary" ||
      selected === "full-time" ||
      selected === "part-time"
    ) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          const selectedDateString = selected; // Example selected date string
          const jobPostingDateString = postingDate; // Example job posting date string

          // Convert the date strings into Date objects
          const selectedDate = new Date(selectedDateString);
          const jobPostingDate = new Date(jobPostingDateString);
          return (
            jobPostingDate > selectedDate ||
            (jobLocation &&
              jobLocation.toLowerCase() === selected.toLowerCase()) ||
            (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
            (experienceLevel &&
              experienceLevel.toLowerCase() === selected.toLowerCase()) ||
            (salaryType &&
              salaryType.toLowerCase() === selected.toLowerCase()) ||
            (employmentType &&
              employmentType.toLowerCase() === selected.toLowerCase())

            // Compare parsed dates
          );
        }
      );
    } else {
      console.log("you filtered date ");
      filteredJobs = filteredJobs.filter(({ postingDate }) => {
        const selectedDateString = selected; // selected date string
        const jobPostingDateString = postingDate; //job posting date string

        // Convert the date strings into Date objects
        const selectedDate = new Date(selectedDateString);
        const jobPostingDate = new Date(jobPostingDateString);
        return (
          jobPostingDate > selectedDate
          // Compare parsed dates
        );
      });
    }

    // slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    // Map the filtered jobs to Card components
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 ">
        {/* Left Cards */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />{" "}
        </div>

        {/* Job Cards */}
        <div className="col-span-2 bg-white p-4  rounded-sm">
          {isLoading ? (
            <p className="font-medium"> Loading.....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="tetx-lg  font-bold mb-2"> {result.length} Jobs</h3>
              <p> No Data Found ! </p>
            </>
          )}
          {/* pagination here */}
          {result.length > 0 ? (
            <div className=" flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                {" "}
                Previous{" "}
              </button>
              <span className="mx-2">
                {" "}
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}{" "}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                {" "}
                Next{" "}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right Cards */}
        <div className="bg-white p-4 rounded ">
          {" "}
          <NewsLetter />{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
