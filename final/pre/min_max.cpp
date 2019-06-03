#include <iostream>
#include <fstream>
#include <iomanip>

int main(int argc, char** argv){
  std::ifstream ifs(argv[1], std::ios::in | std::ios::binary);
  std::ofstream ofs("TurblenceData_raw.js", std::ios::out);

  ofs << "TurblenceData = function(){" << std::endl;
  ofs << "this.dimx = 256;" << std::endl;
  ofs << "this.dimy = 256;" << std::endl;
  ofs << "this.dimz = 256;" << std::endl;

  ifs.seekg(0, std::ios::end);
  auto eofpos = ifs.tellg();
  ifs.clear();
  ifs.seekg(0, std::ios::beg);
  auto begpos = ifs.tellg();
  auto size = eofpos - begpos;
  std::cout << "byte size: " << size << std::endl;
  int type_size = sizeof(float);
  auto data_number = size / type_size;
  std::cout << "float size: " << type_size << std::endl;
  std::cout << "data number: " << data_number << std::endl;
  
  float min = 0;
  float max = 0;
  float readn = 0;
  for(auto i = 0; i < data_number; i++){
    ifs.read((char*)&readn, type_size);
    if(readn < min){
      min = readn;
    }
    if(readn > max){
      max = readn;
    }
    if(i%1000000 == 0){
      std::cout << "MinMax: " << ((float)i / data_number)*100.0 << "%" << std::endl;
    }
  }
  std::cout << "min: " << min << std::endl;
  std::cout << "max: " << max << std::endl;
  
  ofs << std::fixed;
  //ofs << std::setprecision(3);
  ofs << "this.min = " << min << ";" << std::endl;
  ofs << "this.max = " << max << ";" << std::endl;

  ifs.clear();
  ifs.seekg(0, std::ios::beg);
  ofs << "this.value = [" << std::endl;
  for(auto i = 0; i < data_number; i++){
    ifs.read((char*)&readn, type_size);
    ofs << readn << "," << std::endl;
    if(i%100000 == 0){
      std::cout << "write: " << ((float)i / data_number)*100.0 << "%" << std::endl;
    }
  }
  ofs << "];" << std::endl << "}" << std::endl;
  
  ifs.close();
  ofs.close();
  return 0;
}
