#include <iostream>
#include <fstream>

int main(int argc, char** argv){
  std::ifstream ifs(argv[1], std::ios::in | std::ios::binary);
  /*ifs.close();
  std::ofstream out("out.txt", std::ios::out);
  out << "hello" << std::endl;
  out.close();*/
 
  //std::ifstream ifs(filepath, std::ios::binary);
  ifs.seekg(0, std::ios::end);
  auto eofpos = ifs.tellg();
  ifs.clear();
  ifs.seekg(0, std::ios::beg);
  auto begpos = ifs.tellg();
  auto size = eofpos - begpos;
  std::cout << "ifstream: " << size << std::endl;

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
    if(i%10000000 == 0){
      std::cout << i << std::endl;
    }
  }
  std::cout << "min: " << min << std::endl;
  std::cout << "max: " << max << std::endl;
  ifs.close();
  return 0;
}
